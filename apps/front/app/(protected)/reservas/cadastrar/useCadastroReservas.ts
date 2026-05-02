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
            const data = new Date(s.horario);

            const dia = data.toISOString().split('T')[0];
            const hora = data.toISOString().split('T')[1].slice(0,5);

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