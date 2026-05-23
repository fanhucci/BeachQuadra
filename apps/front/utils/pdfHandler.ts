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


    const colunas = ["ID", "Cliente", "Valor", "Status", "Data Pagamento"];

    const linhas = dados.map((item) => [
        item.id_cobranca.toString(),
        item.nome,
        `R$ ${Number(item.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        item.status.toUpperCase(),
        item.data_pagamento 
            ? new Date(item.data_pagamento).toLocaleDateString("pt-BR") 
            : "Pendente"
    ]);

    autoTable(doc, {
        head: [colunas],
        body: linhas,
        startY: 35,
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