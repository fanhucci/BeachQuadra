'use client'

import { apiRequest } from "@/utils/apiHandler"
import { useEffect, useState } from "react";

export default function useCadastroReservas(){
    const [dados, setDados] = useState<any>([]);
    
    const [diasMeses,setDiasMeses] = useState<string[]>([]);
    const [horarioSemana,setHorarioSemana] = useState<string[]>([]);
    

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel`);
        organizarSlots(slots);    
    }

    function organizarSlots(slots:any[]) {
        const mapa:any = {};
        const diasSet = new Set<string>();
        const horasSet = new Set<string>();

        for (const s of slots) {
            const data = new Date(s.horario);

            const dia = data.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric',
                timeZone: 'UTC'
            });
            const hora = data.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false ,
                timeZone: 'UTC'
            });
            diasSet.add(dia);
            horasSet.add(hora);

            if (!mapa[dia]) mapa[dia] = {};
            mapa[dia][hora] = s;
        }
        setDados(mapa);
        setDiasMeses(Array.from(diasSet));
        setHorarioSemana(Array.from(horasSet));
    }

    useEffect(()=>{
        carregarDiasLivres();
    },[]);

   
    return {
        dados,
        diasMeses,
        horarioSemana,
    };
}