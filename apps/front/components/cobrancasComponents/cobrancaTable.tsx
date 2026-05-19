'use client'

import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Cobranca } from "@app/shared";
import { useMemo } from "react";
import { Search } from "lucide-react";

export default function CobrancasTable() {

    const statusStyles: Record<string, { bg: string; text: string; border: string; label: string; dot: string }> = {
        concluido: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", label: "Concluído" },
        pendente: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", label: "Pendente" },
        cancelado: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", label: "Cancelado" },
        expirado: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", label: "Expirado" },
        estornado: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500", label: "Estornado" },
    };

    const colunas = useMemo<Column<Cobranca>[]>(() => [
        { 
            key: "id_agendamento", 
            label: "Agendamento",
            align: "center",
            render: (value: string) => <span className="font-mono text-gray-900 font-semibold">#{value}</span>
        },
        { 
            key: 'nome', 
            label: 'Cliente',
        },
        { 
            key: "valor", 
            label: "Valor",
            align: "right",
            render: (value: string) => <span className="font-semibold text-gray-900 tracking-tight">{dinheiroMask(value)}</span>
        },
        { 
            key: "status", 
            label: "Status",
            align: "left",
            render: (value: string) => {
                const statusKey = String(value).toLowerCase();
                const style = statusStyles[statusKey] || { 
                    bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200", dot: "bg-gray-400", label: value 
                };

                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-sm select-none`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        {style.label}
                    </span>
                );
            }
        },
        { 
            key: "data_pagamento", 
            label: "Pagamento",
            render: (value: string) =>
                value ? (
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-gray-800">{new Date(value).toLocaleDateString('pt-br', { timeZone: 'utc' })}</span>
                        <span className="text-xs text-gray-400 font-normal">{new Date(value).toLocaleTimeString('pt-br', { timeZone: 'utc', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                ) : (
                    <span className="text-xs text-gray-400 italic font-normal">—</span>
                )
        },
        {
            key: 'acoes', 
            label: "Ações", 
            align: 'center',
            render: (_, a) => (
                <div className="flex justify-center gap-2">
                    <LinkButton
                        className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50/50 text-gray-700 hover:text-blue-600 transition-all active:scale-95"
                        estilo="secundario"
                        href={`/agendamentos/${a.id_agendamento}`}
                    >
                        <span>Detalhes</span>
                        <Search size={14} className="stroke-[2.5]" />
                    </LinkButton>
                </div>
            )
        }
    ], []);

    return {
        colunas
    };
}