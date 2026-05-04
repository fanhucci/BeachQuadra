'use client'

import CustomTable from "@/components/customTable";
import useAgendamento from "./useAgendamento"
import CustomButtom from "@/components/customButton";
import { Link } from "lucide-react";

export default function AgendamentosPage(){
    const {agendamentos} = useAgendamento();

    const tabela = agendamentos.map((d)=>({
        nome:d.nome,
        status:d.status,
        valor:d.valor_total,
        acoes:(<Link href={`/agendamento/${agendamentos.id_agendamento}`}/>)
    }))
       

    const colunas = [
        { key: "nome", label: "Cliente" },
        { key: "status", label: "Status" },
        { key: "valor_total", label: "Total" },
        { key: 'acoes', label: "Açoes"}
    ]
    
    return(
        <div>
            {
                tabela.length>0?
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

