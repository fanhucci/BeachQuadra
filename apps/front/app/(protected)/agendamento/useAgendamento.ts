'use client'

import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";

export default function useAgendamento(){
    const [agendamentos,setAgendamentos] = useState([]);

    async function carregarAgendamentos(){
        const dados = await apiRequest(`/agendamento`);
        setAgendamentos(dados);
    }

    useEffect(()=>{
        carregarAgendamentos();
    },[]);

    return{
        agendamentos
    }
}
