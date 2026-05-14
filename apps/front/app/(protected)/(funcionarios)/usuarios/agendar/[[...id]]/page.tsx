'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"

export default function AgendarClientePage(){
    return(
        <AgendamentoFormComponent
            context="funcionario"
            clientePreSelecionado={}
        />
    )
}