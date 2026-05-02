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

            const dia = data.toLocaleString();
            const hora = data.toLocaleTimeString();

            diasSet.add(dia);
            horasSet.add(hora);

            if (!mapa[dia]) mapa[dia] = {};
            mapa[dia][hora] = s;
        }

        return {
            mapa,
            diasDaSemana: Array.from(diasSet).sort(),
            horariosDoDia: Array.from(horasSet).sort()
        };
    }

    useEffect(()=>{
        carregarDiasLivres();
    },[])

    return dados;
}