'use client'
import { apiRequest } from "@/utils/apiHandler"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function useDetailAgendamento(){
    const {id} = useParams();
    const [agendamento,setAgendamento] = useState(null);
    const [status,setStatus] = useState('')
    async function carregarAgendamento(){
        const dados = await apiRequest(`/agendamento/${id}`);
        setAgendamento(dados);
        setStatus(dados.status);
    }

    async function alterarStatus(id_agendamento:number){
        try {
            await apiRequest(`/agendamento/:id_agendamento`,{
                method:'POST',
                body:JSON.stringify(status)
            })
        } catch (error) {
            
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