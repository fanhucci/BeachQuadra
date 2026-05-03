'use client'

import useDetailAgendamento from "./useDetailAgendamento"

export default function AgendamentoDetailPage(){
    const {agendamento} = useDetailAgendamento();

    return(
        <p>
            {JSON.stringify(agendamento)}
        </p>
    )
}