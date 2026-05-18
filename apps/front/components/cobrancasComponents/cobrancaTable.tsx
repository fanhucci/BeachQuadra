'use client'
import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Cobranca } from "@app/shared";
import { useMemo } from "react";
import { Search } from "lucide-react";


export default function CobrancasTable(){

    const colunas = useMemo<Column<Cobranca>[]>(()=>[
        { 
            key: "id_agendamento", label: "Agendamento",
            render:(value:string)=>`#${value}`
        },
        { key:'nome', label:'Cliente'},
        { key: "valor", label: "Valor",
            render:(value:string)=>(dinheiroMask(value))
        },
        { key:"status", label: "Status" },
        { 
            key:"data_pagamento", label: "Pagamento",
            render:(value:string)=>
                value
                    ? (
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-800">{new Date(value).toLocaleDateString('pt-br', {timeZone:'utc'})}</span>
                            <span className="text-xs text-gray-400">{new Date(value).toLocaleTimeString('pt-br', {timeZone:'utc', hour:'2-digit', minute:'2-digit'})}</span>
                        </div>
                    )
                    : 'Pendente'
        },
        {
            key:'acoes', label:"Ações", align:'center',
            render:(_,a)=>(
                <div className="flex justify-center gap-2">
                    <LinkButton
                        className="w-fit"
                        estilo="primario"
                        href={`/agendamentos/${a.id_agendamento}`}
                    >
                        Detalhes <Search size={16}/>
                    </LinkButton>
                </div>
            )

        }
    ],[]);

    return{
        colunas
    }
}