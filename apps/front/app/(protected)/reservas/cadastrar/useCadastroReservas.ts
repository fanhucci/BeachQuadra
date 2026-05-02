'use client'

import { apiRequest } from "@/utils/apiHandler"
import { useEffect, useState } from "react";

export default function useCadastroReservas(){
    const [dados, setDados] = useState<any>(null);

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel`);
        setDados(organizarSlots(slots));    
    }

    function organizarSlots(slots:any[]) {
        const mapa:any = {};
        const diasSet = new Set<string>();
        const horasSet = new Set<string>();

        for (const s of slots) {
            const [horario,] = s.horario.split('Z'); 
            const data = new Date(horario);

            const dia = data.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
            });
            const hora = data.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false  
            });
            diasSet.add(dia);
            horasSet.add(hora);

            if (!mapa[dia]) mapa[dia] = {};
            mapa[dia][hora] = s;
        }

        return {
            mapa,
            diasDaSemana: Array.from(diasSet),
            horariosDoDia: Array.from(horasSet)
        };
    }

    useEffect(()=>{
        carregarDiasLivres();
    },[])

    return dados;
}