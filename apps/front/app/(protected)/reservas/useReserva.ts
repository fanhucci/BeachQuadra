'use client'

import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";

export default function useResrva(){
    const [reservas,setReservas] = useState([]);

    const columns = [
        { key:"reserva", label:"Reserva"},

    ]

    async function carregarReservas(){
        const dados = await apiRequest(``);
        setReservas(dados);
    }

    useEffect(()=>{
        carregarReservas();
    },[])

    return{
        columns,
        reservas,
    }
}

