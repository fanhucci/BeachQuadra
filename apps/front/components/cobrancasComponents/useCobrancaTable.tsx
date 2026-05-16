'use client'
import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Cobranca } from "@app/shared";
import { useMemo } from "react";
import { Search } from "lucide-react";


export default function useCobrancaTable(){

    const colunas = useMemo<Column<Cobranca>[]>(()=>[
        { key: "id_agendamento", label: "Agendamento" },
        { key: "valor", label: "Valor",
            render:(value:string)=>(dinheiroMask(value))
        },
        { key:"status", label: "Status" },
        { 
            key:"data_pagamento", label: "Pagamento",
            render:(value:string)=>
                value
                    ? new Date(value).toLocaleString('pt-br',{ timeZone:'utc', day:'2-digit', month:'2-digit', year:'2-digit', hour:'2-digit', minute:'2-digit'})
                    : 'Pendente'
            
        },
        {
            key:'acoes', label:"Ações", align:'center',
            render:(_,a)=>(
                <LinkButton
                className="w-fit"
                    estilo="primario"
                    href={`/agendamentos/${a.id_agendamento}`}
                >
                    Detalhes <Search size={16}/>
                </LinkButton>
            )

        }
    ],[]);

    return{
        colunas
    }
}