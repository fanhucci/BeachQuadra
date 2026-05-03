'use client'

import Campo from "@/components/campo";
import useDetailAgendamento from "./useDetailAgendamento"

export default function AgendamentoDetailPage(){
    const {agendamento} = useDetailAgendamento();

    if(!agendamento) return <>Carregando...</>

    const cliente = agendamento.cliente;
    const responsavel = agendamento.criado_por;
    const reservas = agendamento.reservas;
    
    return(
        <div className="flex flex-1 w-full p-2">
            <div className="">
                <Campo
                    key={cliente.id_pessoa}
                    label="Cliente"
                    valor={cliente.nome}
                />
                <Campo
                    key={responsavel.id_pessoa}
                    label="Responsavel"
                    valor={responsavel.nome}
                />
                <div>
                    <p>Reservas</p>
                    {
                        reservas.map((r,index)=>{
                            <Campo
                            key={index}
                            label="Horario"
                            valor={r.horario}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
}