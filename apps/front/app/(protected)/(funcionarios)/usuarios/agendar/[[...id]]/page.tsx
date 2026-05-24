'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
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
    
    
    if(!perfil){
        return(
            <AgendamentoFormComponent
                context="funcionario"
            />
        )
    }
    else{
        return(
            <AgendamentoFormComponent
                context="funcionario"
                clientePreSelecionado={perfil.usuario}
            />
        )
    }

}