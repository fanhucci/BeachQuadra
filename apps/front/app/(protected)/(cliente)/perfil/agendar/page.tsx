'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { Usuario } from "@app/shared";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function AgendarPage(){
    const {user} = useUser();
    const router = useRouter();

    const [perfil,setPerfil] = useState<Usuario|null>(null);
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
        const idInvalido = isNaN(Number(user?.id_pessoa));
        
        if(!idInvalido){ 
           pegarUsuario(Number(user?.id_pessoa));
        }
    },[user])

    if(loading){
        return (<>Carregando...</>)
    }

    if(!perfil) {
        router.replace('/login');
        return null;
    }

    return(
        <AgendamentoFormComponent
            context="cliente"
            clientePreSelecionado={perfil}
        />
    )
}