'use client'
import { apiRequest } from "@/utils/apiHandler"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useDetailAgendamento(){
    const {id} = useParams();
    const [agendamento,setAgendamento] = useState(null);
    const [status,setStatus] = useState({status:""})

    async function carregarAgendamento(){
        const dados = await apiRequest(`/agendamento/${id}`);
        setAgendamento(dados);
        setStatus({status:dados.status});
    }

    async function alterarStatus(id_agendamento:number){
        try {
            await apiRequest(`/agendamento/${id_agendamento}`,{
                method:'PATCH',
                body:JSON.stringify(status)
            })
            toast.success('Alteração feita com sucesso!');
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    useEffect(()=>{
        if(id && !isNaN(id)){
            carregarAgendamento();
        }
    },[id]);

    return{
        agendamento,
        status,
        setStatus,
        alterarStatus
    }
}