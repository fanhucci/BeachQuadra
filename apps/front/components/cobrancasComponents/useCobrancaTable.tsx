'use client'
import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Cobranca, Quadra } from "@app/shared";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import { useMemo } from "react";

type AcoesCobranca = {
   
}

export default function useCobrancaTable(acoes:AcoesCobranca){

    const colunas = useMemo<Column<Cobranca>[]>(()=>[
        { key: "id_pessoa", label: "Cliente" },
        { key: "id_agendamento", label: "Agendamento",},
        { key: "valor", label: "Valor",
            render:(value:string)=>(dinheiroMask(value))
        },
        { key:"status", label: "Status" },
        { 
            key:"data_pagamento", label: "Pagamento",
            render:(value:string)=>
                value
                    ? new Date(value).toLocaleString('pt-br',{ timeZone:'utc', hour:'2-digit', minute:'2-digit'})
                    : 'Pendente'
            
        },
        { 
            key: "ações", label: "Ações", align:"center",
            render: (_:any, c:Cobranca) => (
                <div className="flex justify-center gap-2">
    
                    <LinkButton 
                        href={`/cobrancas/${c.id_cobranca}`} 
                        estilo="primario"
                    >
                        <span className="hidden lg:inline">Detalhes</span>
                    </LinkButton>
                  
                </div>
            )

        },

    ],[acoes]);

    return{
        colunas
    }
}