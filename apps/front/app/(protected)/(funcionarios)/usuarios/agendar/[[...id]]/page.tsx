'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
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
    console.log('teste'+perfil)
    
    if(!perfil){
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
                    context="funcionario"
                    clientePreSelecionado={perfil?.usuario}
                />
            </>
        )
    }

}