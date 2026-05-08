'use client'

import { apiRequest } from "@/utils/apiHandler";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function useQuadraDetail(){
    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [quadra,setQuadra] = useState(null);
    const router = useRouter();


    async function carregarDados(){

        const idQuadra = Number(id);
        
        if(isNaN(idQuadra)){
            toast.error(`ID inválido`);
            return;
        }

        try {
            setLoading(true);

            const dados = await apiRequest(`/horario-disponivel/${idQuadra}`);

            setQuadra(dados);

        } 
        catch(error){
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
        finally{
            setLoading(false);
        }
    }

    const mostrarAgendamento = (slot)=>{
        router.push(`/agendamento/${slot.id_agendamento}`);
    }

    useEffect(()=>{
        if(id){
            carregarDados();
        }
    },[id])

    return{
        loading,
        quadra,
        id,
        mostrarAgendamento
    }
}