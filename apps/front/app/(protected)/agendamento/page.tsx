'use client'

import useAgendamento from "./useAgendamento"

export default function AgendamentosPage(){
    const {agendamentos} = useAgendamento();

    return(
        <>{JSON.stringify(agendamentos)}</>
    )
}