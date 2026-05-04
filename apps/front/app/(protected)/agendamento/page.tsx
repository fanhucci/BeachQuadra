'use client'

import CustomTable from "@/components/customTable";
import useAgendamento from "./useAgendamento"
import CustomButtom from "@/components/customButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AgendamentosPage(){
    const {agendamentos} = useAgendamento();
    const router = useRouter();

    const tabela = agendamentos.map((d)=>({
        nome:d.nome,
        status:d.status,
        valor:d.valor_total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
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
        <div>
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

