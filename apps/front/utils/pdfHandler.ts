import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { cpfMask, dinheiroMask } from "./mascaras";



const formatarDataUTC = (dataString: string | null): string => {
    if (!dataString) return "Pendente";
    return new Date(dataString).toLocaleDateString("pt-BR", { timeZone: "UTC" });
};


interface CobrancaItem {
    id_cobranca: string;
    nome: string; 
    valor: number;
    status: string;
    data_pagamento: string | null;
}

export function gerarPDFCobranças(dados: CobrancaItem[], filtrosTexto: string) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const totais = dados.reduce(
        (acc, item) => {
            const valorNum = Number(item.valor) || 0;
            const statusLower = item.status.toLowerCase();

            if(statusLower === "concluido" || statusLower === "pendente" ){
                acc.totalGeral += valorNum;
            }
            
            if (statusLower === "concluido") {
                acc.totalRecebido += valorNum;
            } else if (statusLower === "pendente") {
                acc.totalPendente += valorNum;
            }

            return acc;
        },
        { totalGeral: 0, totalRecebido: 0, totalPendente: 0 }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(31, 41, 55); 
    doc.text("Relatório Financeiro de Cobranças", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); 
    doc.text(`Filtros ativos: ${filtrosTexto}`, 14, 26);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 30, 196, 30);

    const resumoY = 36; 

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL FATURADO", 14, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text(dinheiroMask(totais.totalGeral), 14, resumoY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL RECEBIDO", 75, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(22, 163, 74); 
    doc.text(dinheiroMask(totais.totalRecebido), 75, resumoY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL PENDENTE", 140, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 38); 
    doc.text(dinheiroMask(totais.totalPendente), 140, resumoY + 6);

    doc.setDrawColor(243, 244, 246);
    doc.line(14, resumoY + 12, 196, resumoY + 12);

    const colunas = ["ID", "Cliente", "Valor", "Status", "Data Pagamento"];

    const formatarStatus = (status: string) => {
        const s = status.toLowerCase();
        if (s === "concluido") return "Concluído";
        if (s === "pendente") return "Pendente";
        if (s === "cancelado") return "Cancelado";
        if (s === "expirado") return "Expirado";
        if (s === "estornado") return "Estornado";
        return status; 
    };

    const linhas = dados.map((item) => [
        item.id_cobranca.toString(),
        item.nome,
        dinheiroMask(item.valor),
        formatarStatus(item.status),
        formatarDataUTC(item.data_pagamento)
    ]);

    autoTable(doc, {
        head: [colunas],
        body: linhas,
        startY: 54, 
        styles: { font: "helvetica", fontSize: 9, cellPadding: 3 },
        headStyles: {
            fillColor: [31, 41, 55], 
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [249, 250, 251] }, 
        margin: { left: 14, right: 14 },
    });

    const dataHoje = new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" }).replace(/\//g, "-");
    doc.save(`relatorio-cobrancas-${dataHoje}.pdf`);
}


interface OcupacaoItem {
    id_quadra: string | number;
    nome: string;
    tipo: 'individual' | 'duplas';
    total_reservas: number;
    total_cancelamentos: number;
    total_geral: number;
}

export function gerarPDFOcupacao(dados: OcupacaoItem[], filtrosTexto: string) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const totais = dados.reduce(
        (acc, item) => {
            const reservasNum = Number(item.total_reservas) || 0;
            const cancelamentosNum = Number(item.total_cancelamentos) || 0;

            acc.totalHoras += reservasNum;
            acc.totalCancelamentos += cancelamentosNum;

            if (reservasNum > acc.maiorVolume) {
                acc.maiorVolume = reservasNum;
                acc.quadraMaisPopular = item.nome;
            }

            return acc;
        },
        { totalHoras: 0, totalCancelamentos: 0, quadraMaisPopular: "Nenhuma", maiorVolume: -1 }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(31, 41, 55); 
    doc.text("Relatório de Ocupação de Quadras", 14, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(107, 114, 128); 
    doc.text(`Filtros ativos: ${filtrosTexto}`, 14, 26);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 30, 196, 30);

    const resumoY = 36; 

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("QUADRA MAIS POPULAR", 14, resumoY);
    doc.setFontSize(12); 
    doc.setTextColor(31, 41, 55);
    doc.text(totais.quadraMaisPopular, 14, resumoY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL HORAS JOGADAS", 75, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229); 
    doc.text(`${totais.totalHoras}h`, 75, resumoY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL CANCELAMENTOS", 140, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 38); 
    doc.text(`${totais.totalCancelamentos}`, 140, resumoY + 6);

    doc.setDrawColor(243, 244, 246);
    doc.line(14, resumoY + 12, 196, resumoY + 12);

    const colunas = ["ID", "Quadra / Complexo", "Categoria", "Horas Jogadas", "Cancelamentos", "Índice Desistência"];

    const linhas = dados.map((item) => {
        const reservas = Number(item.total_reservas) || 0;
        const cancelamentos = Number(item.total_cancelamentos) || 0;
        const totalTentativas = reservas + cancelamentos;
        const taxa = totalTentativas > 0 ? Math.round((cancelamentos / totalTentativas) * 100) : 0;

        return [
            `#${item.id_quadra}`,
            item.nome,
            item.tipo === "individual" ? "Individual" : "Duplas",
            `${reservas}h`,
            cancelamentos.toString(),
            `${taxa}%`
        ];
    });

    autoTable(doc, {
        head: [colunas],
        body: linhas,
        startY: 54, 
        styles: { font: "helvetica", fontSize: 9, cellPadding: 3 },
        headStyles: {
            fillColor: [31, 41, 55], 
            textColor: [255, 255, 255],
            fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [249, 250, 251] }, 
        margin: { left: 14, right: 14 },
    });

    const dataHoje = new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" }).replace(/\//g, "-");
    doc.save(`relatorio-ocupacao-${dataHoje}.pdf`);
}


interface HistoricoItem {
    id_agendamento: number;
    created_at: string;
    quantidade_itens: number;
    valor_total: string | number;
    status: string;
}

interface InfoCliente {
    nome: string;
    identificacao?: string;
}

export function gerarPDFHistorico(dados: HistoricoItem[], filtrosTexto: string, infoCliente: InfoCliente) {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const totais = dados.reduce(
        (acc, item) => {
            const valorNum = Number(item.valor_total) || 0;
            const reservasNum = Number(item.quantidade_itens) || 0;
            const statusLower = item.status.toLowerCase();

            if (statusLower === "finalizado" || statusLower === "pendente") {
                acc.totalFinanceiro += valorNum;
                acc.totalReservasValidas += reservasNum;
            }

            if (statusLower === "cancelado") {
                acc.totalCancelados += 1;
            } else {
                acc.totalAgendamentosValidos += 1;
            }

            return acc;
        },
        { totalFinanceiro: 0, totalReservasValidas: 0, totalAgendamentosValidos: 0, totalCancelados: 0 }
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(31, 41, 55); 
    doc.text("Histórico de Agendamentos", 14, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(`Cliente: ${infoCliente.nome}`, 14, 30);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`ID/Doc: ${infoCliente.identificacao? cpfMask(infoCliente.identificacao) : 'N/A'}`, 14, 35);

    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128); 
    doc.text(`Filtros ativos: ${filtrosTexto}`, 14, 42);
    
    doc.setDrawColor(229, 231, 235);
    doc.line(14, 46, 196, 46);

    const resumoY = 52; 

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("VALOR TOTAL", 14, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(31, 41, 55);
    doc.text(dinheiroMask(totais.totalFinanceiro), 14, resumoY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL DE RESERVAS", 75, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(79, 70, 229); 
    doc.text(`${totais.totalReservasValidas} un.`, 75, resumoY + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("CONCLUÍDOS / CANCELADOS", 140, resumoY);
    doc.setFontSize(12);
    doc.setTextColor(31, 41, 55); 
    doc.text(`${totais.totalAgendamentosValidos} / `, 140, resumoY + 6);
    
    const larguraTextoAtivo = doc.getTextWidth(`${totais.totalAgendamentosValidos} / `);
    doc.setTextColor(220, 38, 38);
    doc.text(`${totais.totalCancelados} canc.`, 140 + larguraTextoAtivo, resumoY + 6);

    doc.setDrawColor(243, 244, 246);
    doc.line(14, resumoY + 12, 196, resumoY + 12);

    const colunas = ["ID Agendamento", "Data do Registro", "Qtd. Reservas", "Valor Total", "Status"];
    const linhas = dados.map((item) => [
        `#${item.id_agendamento}`,
        formatarDataUTC(item.created_at), 
        `${item.quantidade_itens} un.`,
        dinheiroMask(item.valor_total), 
        item.status.charAt(0).toUpperCase() + item.status.slice(1)
    ]);

    autoTable(doc, {
        head: [colunas],
        body: linhas,
        startY: 70, 
        styles: { font: "helvetica", fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [31, 41, 55], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [249, 250, 251] }, 
        margin: { left: 14, right: 14 },
    });

    const dataHoje = new Date().toLocaleDateString("pt-BR", { timeZone: "UTC" }).replace(/\//g, "-");
    doc.save(`historico-${infoCliente.nome.replace(/\s+/g, '-').toLowerCase()}-${dataHoje}.pdf`);
}


export function gerarPDFAgenda(dados: any[]) {
    const doc = new jsPDF();
    
    const lista = dados.filter(h => h.agendamentos.length > 0);

    doc.text("Relatório de Agendamentos", 14, 15);
    
    const corpoTabela = lista.flatMap(item => 
        item.agendamentos.map((a: any) => [
            new Date(item.horario).toLocaleDateString('pt-BR',{timeZone:'utc'}),
            new Date(item.horario).toLocaleTimeString('pt-BR', {timeZone:'utc', hour: '2-digit', minute: '2-digit'}),
            a.nome,
            cpfMask(a.cpf)
        ])
    );

    autoTable(doc, {
        head: [['Data', 'Horário', 'Cliente', 'CPF']],
        body: corpoTabela,
        startY: 25,
    });

    doc.save("agenda_atendimentos.pdf");
}