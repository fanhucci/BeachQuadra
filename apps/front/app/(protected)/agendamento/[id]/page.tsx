'use client'

import useDetailAgendamento from "./useDetailAgendamento"

export default function AgendamentoDetailPage(){
    const {agendamento} = useDetailAgendamento();
    if(!agendamento) return <>Carregando...</>

    const cliente = agendamento[0].cliente;
    const responsavel = agendamento.criado_por;
    const reservas = agendamento.reservas;
    
    return(
        <div className="flex flex-1 w-full p-2">
            <div className="">
                <div>
                    {
                        JSON.stringify(cliente)

                    }
                </div>
                <div>
                    {
                        JSON.stringify(responsavel)

                    }
                </div>
                <div>
                    {
                        JSON.stringify(reservas)

                    }
                </div>

            </div>
        </div>
    )
}