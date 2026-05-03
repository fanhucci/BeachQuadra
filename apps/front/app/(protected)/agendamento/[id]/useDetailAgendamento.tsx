'use client'
import { apiRequest } from "@/utils/apiHandler"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function useDetailAgendamento(){
    const {id} = useParams();
    const [agendamento,setAgendamento] = useState({});

    async function carregarAgendamento(){
        const dados = await apiRequest(`/agendamento/${id}`);
        setAgendamento(dados);
    }

    useEffect(()=>{
        if(id && !isNaN(id)){
            carregarAgendamento();
        }
    },[id]);
    
    return{
        agendamento
    }
}