'use client'

import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Agendamento = {
    id_agendamento: number;
    nome:string;
    status:string;
    valor_total:number;
}

export default function useAgendamento(){
    const [loading,setLoading] = useState<boolean>(false);
    const [agendamentos,setAgendamentos] = useState<Agendamento[]>([]);

    async function carregarAgendamentos(){
        try {
            setLoading(true)
            const dados = await apiRequest(`/agendamento`);
        
            setAgendamentos(dados);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao carregar agendamentos.')
        }
        finally{
            setLoading(false);
        }
    
    }
    

    useEffect(()=>{
        carregarAgendamentos();
    },[]);

    return{
        loading,
        agendamentos
    }
}
