'use client'

import CustomTable from "@/components/customTable";
import useAgendamento from "./useAgendamento"
import CustomButtom from "@/components/customButton";
import { useRouter } from "next/navigation";

export default function AgendamentosPage(){
    const {agendamentos} = useAgendamento();
    const router = useRouter();

    const tabela = agendamentos.map((d)=>({
        nome:d.nome,
        status:d.status,
        valor_total:d.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        acoes:(
        <CustomButtom funcao={()=>router.replace(`/agendamento/${d.id_agendamento}`)} texto="Detalhes" tipo="secundario"/>)
    }))
       

    const colunas = [
        { key: "nome", label: "Cliente" },
        { key: "status", label: "Status" },
        { key: "valor_total", label: "Total" },
        { key: 'acoes', label: "Ações"}
    ]
    
    return(
        <div className="flex flex-col flex-1 p-6 gap-4">
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-gray-500">Filtros:</div>
                    
             

            </div>
            {
                tabela.length>0?
                    <CustomTable
                        columns={colunas}
                        data={tabela}
                    />
                :
                    <p>Nenhum agendamento cadastrado</p>
            }
        </div>
    )
}

