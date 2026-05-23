import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
            acc.totalGeral += valorNum;
            
            if (item.status.toLowerCase() === "pago" || item.status.toLowerCase() === "concluido") {
                acc.totalRecebido += valorNum;
            } else if (item.status.toLowerCase() === "pendente") {
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
    doc.text(`R$ ${totais.totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, 14, resumoY + 6);

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL RECEBIDO", 75, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(22, 163, 74); 
    doc.text(`R$ ${totais.totalRecebido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, 75, resumoY + 6);


    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text("TOTAL PENDENTE", 140, resumoY);
    doc.setFontSize(14);
    doc.setTextColor(220, 38, 38); 
    doc.text(`R$ ${totais.totalPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`, 140, resumoY + 6);

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
        `R$ ${Number(item.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        formatarStatus(item.status),
        item.data_pagamento 
            ? new Date(item.data_pagamento).toLocaleDateString("pt-BR") 
            : "Pendente"
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

    const dataHoje = new Date().toISOString().split('T')[0];
    doc.save(`relatorio-cobrancas-${dataHoje}.pdf`);
}