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
                            title:"Período Semanal",
                            description:"Use este campo para navegar entre as semanas e encontrar o melhor dia para sua reserva."
                        }
                    },
                    {
                        element:"#seletor-tipo-quadra",
                        popover:{
                            title:"Modalidade",
                            description:"Filtre as quadras disponíveis pela modalidade desejada."
                        }
                    },
                    {
                        element:"#seletor-horarios",
                        popover:{
                            title:"Horários Disponíveis",
                            description:"Os horários em verde estão livres. Clique para selecionar vários de uma só vez."
                        }
                    },
                    {
                        element:"#seletor-horarios-selecionados",
                        popover:{
                            title:"Resumo da Seleção",
                            description:"Aqui você acompanha o que já escolheu. Precisa desistir de algum? Basta clicar no item para removê-lo."
                        }
                    },
                    {
                        element:"#botao-concluir",
                        popover:{
                            title:"Finalizar Reserva",
                            description:"Tudo certo? Clique aqui para confirmar seus horários e continuar para finalizar a reserva."
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