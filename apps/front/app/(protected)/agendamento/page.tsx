'use client'

import CustomTable from "@/components/customTable";
import useAgendamento from "./useAgendamento"

export default function AgendamentosPage(){
    const {agendamentos} = useAgendamento();

    const colunas = [
        { key: "status", label: "Status" },
        { key: "valor_total", label: "Total" },
        { key: "nome", label: "Usuario" },
    ]
    return(
        <div>
            {
                agendamentos.length>0?
                    <CustomTable
                        columns={colunas}
                        data={agendamentos}
                    />
                :
                    <p>Nenhum agendamento cadastrado</p>
            }
        </div>
    )
}