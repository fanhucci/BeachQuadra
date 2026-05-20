'use client'

import { Column } from "@/components/customTable";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { Usuario } from "@app/shared";
import { useMemo } from "react";
import { Calendar, Edit, ShieldAlert, ShieldCheck } from "lucide-react";
import LinkButton from "../buttonComponents/linkButton";

type UseUsuariosTableProps = {
    editar: (usuario: Usuario) => void;
    ativar: (id: number) => void;
    desativar: (id: number) => void;
}

export default function useUsuariosTable({ editar, ativar, desativar }: UseUsuariosTableProps) {

    const statusStyles: Record<string, { bg: string; text: string; border: string; label: string; dot: string }> = {
        ativo: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500", label: "Ativo" },
        inativo: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500", label: "Inativo" },
    };

    const colunas = useMemo<Column<Usuario>[]>(() => [
        { 
            key: "id_pessoa", 
            label: "ID",
            align: "center",
            render: (value: string) => <span className="font-mono text-gray-900 font-semibold">#{value}</span>
        },
        { 
            key: 'nome', 
            label: 'Nome Completo',
            render: (value: string, row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{value}</span>
                    <span className="text-xs text-gray-400 font-normal">{row.email}</span>
                </div>
            )
        },
        { 
            key: 'cargo',
            label: 'Cargo',
            render: (value: string) => <span className="text-gray-700 font-medium">{value || "Usuário"}</span>
        },
        { 
            key: "ativo", 
            label: "Status",
            align: "left",
            render: (value: boolean) => {
                const statusKey = value ? "ativo" : "inativo";
                const style = statusStyles[statusKey];

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
                        href={`/usuarios/agendar/${row.id_pessoa}`}
                    >
                        <span>Reservar</span>
                        <Calendar size={13} className="stroke-[2.5]" />
                    </LinkButton>
                    <SubmitButton
                        className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-gray-200 hover:border-blue-200 bg-white hover:bg-blue-50/50 text-gray-700 hover:text-blue-600 transition-all active:scale-95"
                        estilo="secundario"
                        onClick={() => editar(row)}
                    >
                        <span>Editar</span>
                        <Edit size={13} className="stroke-[2.5]" />
                    </SubmitButton>

                    {row.ativo ? (
                        <SubmitButton
                            className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-transparent hover:border-red-200 bg-red-50/40 hover:bg-red-50 text-red-600 transition-all active:scale-95"
                            estilo="fantasma"
                            onClick={() => desativar(row.id_pessoa)}
                        >
                            <span>Bloquear</span>
                            <ShieldAlert size={13} className="stroke-[2.5]" />
                        </SubmitButton>
                    ) : (
                        <SubmitButton
                            className="h-8 text-xs font-semibold flex items-center justify-center gap-1.5 px-3 rounded-lg shadow-sm border border-transparent hover:border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-600 transition-all active:scale-95"
                            estilo="fantasma"
                            onClick={() => ativar(row.id_pessoa)}
                        >
                            <span>Ativar</span>
                            <ShieldCheck size={13} className="stroke-[2.5]" />
                        </SubmitButton>
                    )}
                </div>
            )
        }
    ], [editar, ativar, desativar]);

    return {
        colunas
    };
}