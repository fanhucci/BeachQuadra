'use client'

import { useMemo } from "react";
import { dinheiroMask } from "@/utils/mascaras";
import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import { Calendar } from "lucide-react";

export interface ItemHistorico {
    id_agendamento: number;
    created_at: string;
    valor_total: number;
    status: 'finalizado' | 'pendente' | 'cancelado';
    quantidade_itens: number;
}

export default function usePerfilHistoricoTable() {
    const statusStyles: Record<string, { bg: string; text: string; border: string; label: string; dot: string }> = {
        finalizado: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", label: "Finalizado" },
        pendente: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", label: "Pendente" },
        cancelado: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", label: "Cancelado" },
    };

    const colunas = useMemo<Column<ItemHistorico>[]>(() => [
        { 
            key: "id_agendamento", 
            label: "ID Agendamento",
            render: (value: number) => (
                <span className="font-mono font-medium text-gray-600">#{value}</span>
            )
        },
        { 
            key: "created_at", 
            label: "Data da Operação",
            render: (value: string) => (
                <span className="text-gray-700 font-medium text-sm">
                    {new Date(value).toLocaleDateString('pt-BR')}
                </span>
            )
        },
        { 
            key: "quantidade_itens", 
            label: "Qtd. Reservas",
            render: (value: number) => (
                <span className="text-gray-600 text-sm">{value} un.</span>
            )
        },
        { 
            key: "valor_total", 
            label: "Valor Total",
            align: "right",
            render: (value: number) => (
                <span className="font-semibold text-gray-900 tracking-tight">
                    {dinheiroMask(String(value))}
                </span>
            )
        },
        { 
            key: "status", 
            label: "Status",
            align: "center",
            render: (value: string) => {
                const style = statusStyles[value] || { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", label: value };
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-sm select-none`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        {style.label}
                    </span>
                );
            }
        },
        {
            key: 'acoes', 
            label: "Ações", 
            align: 'center',
            render: (_, row) => (
                <div className="flex justify-center gap-2">

                    <LinkButton
                        estilo="primario"    
                        className="w-fit h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border"
                        href={`/agendamentos/${row.id_agendamento}`}
                    >
                        <span>Detalhes</span>
                        <Calendar size={13} className="stroke-[2.5]" />
                    </LinkButton>
                    
                </div>
            )
        }
    ], []);

    return { colunas };
}