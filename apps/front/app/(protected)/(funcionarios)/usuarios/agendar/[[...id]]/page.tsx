'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
import Carregando from "@/components/carregando";
import HelpButton from "@/components/helpButton";
import { apiRequest } from "@/utils/apiHandler";
import { Perfil } from "@app/shared";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AgendarClientePage(){
    const {id} = useParams();
     
    const [perfil,setPerfil] = useState<Perfil|null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    
    async function pegarUsuario(id:number){
        try {
            setLoading(true);
            const dado = await apiRequest(`/usuarios/${id}`)
            setPerfil(dado);
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao carregar usuário');
        }
        finally{
            setLoading(false);
        }
            
    }
    
    useEffect(()=>{
        const idNumerico = Number(id);
        const temIdNaUrl = id !== undefined && id !== null && id !== "";
        const idValido = !isNaN(idNumerico) && temIdNaUrl;

        if(idValido){ 
           pegarUsuario(idNumerico);
        }
        else{
            setLoading(false);
        }
    },[id])
    
    if(loading) return <Carregando/>
    
    if(!perfil){
        return(
            <>
                <HelpButton
                    steps={[
                        {
                            element: "#seletor-periodo",
                            popover: {
                                title: "Gestão de Período",
                                description: "Utilize o seletor para navegar entre as semanas e visualizar a disponibilidade da grade de horários."
                            }
                        },
                        {
                            element: "#seletor-tipo-quadra",
                            popover: {
                                title: "Filtragem de Quadras",
                                description: "Alterne a visualização entre as diferentes modalidades cadastradas no sistema."
                            }
                        },
                        {
                            element: "#seletor-horarios",
                            popover: {
                                title: "Monitoramento de Horários",
                                description: "Visualize a ocupação da quadra. Os horários em verde indicam disponibilidade para novos agendamentos."
                            }
                        },
                        {
                            element: "#seletor-horarios-selecionados",
                            popover: {
                                title: "Resumo da Operação",
                                description: "Confira os slots selecionados para o agendamento em curso. Clique para remover qualquer item da seleção antes de processar."
                            }
                        },
                        {
                            element: "#botao-concluir",
                            popover: {
                                title: "Confirmar Agendamento",
                                description: "Valide os dados da operação e prossiga para a finalização do registro no sistema. Não se esqueça de selecionar o cliente antes de concluir."
                            }
                        }
                    ]}
                />
                <AgendamentoFormComponent
                    context="funcionario"
                />
            </>
        )
    }
    else{
        return(
            <>
                <HelpButton
                    steps={[
                        {
                            element: "#seletor-periodo",
                            popover: {
                                title: "Gestão de Período",
                                description: "Utilize o seletor para navegar entre as semanas e visualizar a disponibilidade da grade de horários."
                            }
                        },
                        {
                            element: "#seletor-tipo-quadra",
                            popover: {
                                title: "Filtragem de Quadras",
                                description: "Alterne a visualização entre as diferentes modalidades cadastradas no sistema."
                            }
                        },
                        {
                            element: "#seletor-horarios",
                            popover: {
                                title: "Monitoramento de Horários",
                                description: "Visualize a ocupação da quadra. Os horários em verde indicam disponibilidade para novos agendamentos."
                            }
                        },
                        {
                            element: "#seletor-horarios-selecionados",
                            popover: {
                                title: "Resumo da Operação",
                                description: "Confira os slots selecionados para o agendamento em curso. Clique para remover qualquer item da seleção antes de processar."
                            }
                        },
                        {
                            element: "#botao-concluir",
                            popover: {
                                title: "Confirmar Agendamento",
                                description: "Valide os dados da operação e prossiga para a finalização do registro no sistema."
                            }
                        }
                    ]}
                />
                <AgendamentoFormComponent
                    context="funcionario"
                    clientePreSelecionado={perfil}
                />
            </>
        )
    }

}