'use client'

import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Quadra } from "@app/shared";
import { CalendarDays, Edit, ShieldAlert, ShieldCheck } from "lucide-react";
import { useMemo } from "react";

type AcoesQuadra = {
    editar: (quadra: Quadra) => void;
    ativar: (id: number) => void;
    desativar: (id: number) => void;
}

export default function useQuadrasTable(acoes: AcoesQuadra) {

    const statusStyles: Record<string, { bg: string; text: string; border: string; label: string; dot: string }> = {
        disponivel: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", label: "Disponível" },
        indisponivel: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", label: "Indisponível" },
    };

    const ativoStyles: Record<string, { bg: string; text: string; border: string; label: string; dot: string }> = {
        ativa: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500", label: "Ativa" },
        inativa: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", label: "Inativa" },
    };

    const colunas = useMemo<Column<Quadra>[]>(() => [
        { 
            key: "nome", 
            label: "Identificação da Quadra",
            render: (value: string, row) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 tracking-tight">{value}</span>
                    <span className="text-xs text-gray-400 font-normal">ID: #{row.id_quadra}</span>
                </div>
            )
        },
        { 
            key: "tipo", 
            label: "Tipo",
            render: (value: string) => <span className="text-gray-700 font-medium text-sm">{value}</span>
        },
        { 
            key: "valor", 
            label: "Preço/Hora",
            align: "right",
            render: (value: string) => <span className="font-semibold text-gray-900 tracking-tight">{dinheiroMask(value)}</span>
        },
        { 
            key: "status", 
            label: "Disponibilidade",
            align: "left",
            render: (value: boolean) => {
                const style = value ? statusStyles.disponivel : statusStyles.indisponivel;
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-sm select-none`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        {style.label}
                    </span>
                );
            }
        },
        { 
            key: "ativo", 
            label: "Status Cadastral",
            align: "left",
            render: (value: boolean) => {
                const style = value ? ativoStyles.ativa : ativoStyles.inativa;
                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-sm select-none`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        {style.label}
                    </span>
                );
            }
        },
        { 
            key: "ações", 
            label: "Ações", 
            align: "center",
            render: (_, quadra: Quadra) => (
                <div className="flex justify-center gap-2">

                    <LinkButton 
                        href={`/quadras/${quadra.id_quadra}`} 
                        className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50/50 text-gray-700 hover:text-blue-600 transition-all active:scale-95"
                        estilo="secundario"
                    >
                        <span>Agenda</span>
                        <CalendarDays size={14} className="stroke-[2.5]" />
                    </LinkButton>

                    <SubmitButton 
                        onClick={() => acoes.editar(quadra)}
                        className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50/50 text-gray-700 hover:text-blue-600 transition-all active:scale-95"
                        estilo="secundario"
                        title="Editar Quadra"
                    >
                        <span>Editar</span>
                        <Edit size={13} className="stroke-[2.5]" />
                    </SubmitButton>

                    {quadra.ativo ? (
                        <SubmitButton 
                            onClick={() => acoes.desativar(quadra.id_quadra)}
                            className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-transparent hover:border-red-200 bg-red-50/40 hover:bg-red-50 text-red-600 transition-all active:scale-95"
                            estilo="fantasma"
                            title="Desativar"
                        >
                            <span>Bloquear</span>
                            <ShieldAlert size={13} className="stroke-[2.5]" />
                        </SubmitButton>
                    ) : (
                        <SubmitButton 
                            onClick={() => acoes.ativar(quadra.id_quadra)}
                            className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-transparent hover:border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-600 transition-all active:scale-95"
                            estilo="fantasma"
                            title="Ativar"
                        >
                            <span>Ativar</span>
                            <ShieldCheck size={13} className="stroke-[2.5]" />
                        </SubmitButton>
                    )}
                </div>
            )
        },
    ], [acoes]);

    return {
        colunas
    };
}