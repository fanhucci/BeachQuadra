'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
import { apiRequest } from "@/utils/apiHandler";
import { Perfil } from "@app/shared";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AgendarClientePage(){
        const {id} = useParams();
        const router = useRouter();
    
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
            const idInvalido = isNaN(Number(id));
            
            if(!idInvalido){ 
               pegarUsuario(Number(id));
            }
        },[id])
    
        if(loading){
            return (<>Carregando...</>)
        }
    
        if(!perfil) {
            router.replace('/login');
            return null;
        }
    

    return(
        <AgendamentoFormComponent
            context="funcionario"
            clientePreSelecionado={perfil.usuario}
        />
    )
}