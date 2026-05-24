'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
import HelpButton from "@/components/helpButton"

export default function VisitantePage(){

    return(
        <>
            <HelpButton
                steps={[
                    {
                        element:"#seletor-periodo",
                        popover:{
                            title:"Escopo semanal",
                            description:"Aqui é possivel alterar o período de agendamento."
                        }
                    },
                    {
                        element:"#seletor-tipo-quadra",
                        popover:{
                            title:"Tipo de quadra",
                            description:"Escolha entre as modalidades de quadras disponíveis."
                        }
                    },
                    {
                        element:"#seletor-horarios",
                        popover:{
                            title:"Horários disponíveis",
                            description:"Em verde estão os horários disponíveis para reserva, é possivel selecionar mais de um por agendamento."
                        }
                    },
                    {
                        element:"#seletor-horarios-selecionados",
                        popover:{
                            title:"Horários selecionados",
                            description:"Aqui são mostrados todos os hórarios selecionados, é possivel remover eles facilmente ao clicar em um deles."
                        }
                    },
                    {
                        element:"#botao-concluir",
                        popover:{
                            title:"Concluir",
                            description:"Ao terminar sua seleção, basta clicar aqui e confirmar suas reservas."
                        }
                    },
                ]}
            />

            <AgendamentoFormComponent
                context="visitante"
            />
        </>
    )
}