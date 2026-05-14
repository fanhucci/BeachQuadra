'use client'
import { Column } from "@/components/customTable";
import LinkButton from "@/components/inputsComponents/linkButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Agendamento } from "@app/shared";
import { BookSearch } from "lucide-react";
import { useMemo } from "react";



export default function useAgendamentoTable(){

    const colunas = useMemo<Column<Agendamento>[]>(()=>[
        { key: "nome", label: "Cliente" },
        { key: "status", label: "Status"},
        { 
            key: "valor_total", label: "Total",
            render:(value:string)=>(dinheiroMask(value))
        },
        { 
            key: "ações", label: "Ações", align:"center",
            render: (_:any, age:Agendamento) => (
                <div className="flex justify-center gap-2">
    
                    <LinkButton 
                        href={`/agendamentos/${age.id_agendamento}`} 
                        estilo="fantasma"
                    >
                        <BookSearch size={18} />
                        <span className="hidden lg:inline">Detalhes</span>
                    </LinkButton>

                </div>
            )

        },

    ],[]);

    return{
        colunas
    }
}