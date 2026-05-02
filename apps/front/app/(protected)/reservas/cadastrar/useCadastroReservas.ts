'use client'

import { apiRequest } from "@/utils/apiHandler"
import { useEffect, useState } from "react";

export default function useCadastroReservas(){
    const [dados, setDados] = useState<any>(null);
    const [pagina, setPagina] = useState(0);
    const [diasDaSemana,setDiasDaSemana] = useState();
    const [horariosDoDia,setHorariosDoDia] = useState();
    const [diasVisiveis,setDiasVisiveis] = useState();

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
        setDiasDaSemana(Array.from(diasSet));
        setHorariosDoDia(Array.from(horasSet));
    }

    

    function proximaSemana(){
        if ((pagina + 1) * 7 < dados.diasDaSemana.length) {
            setPagina(p => p + 1);
        }
    }

    function semanaAnterior(){
        if (pagina > 0) {
            setPagina(p => p - 1);
        }
    }


    useEffect(()=>{
        carregarDiasLivres();
    },[]);

    useEffect(()=>{
        setDiasVisiveis(diasDaSemana.slice(pagina * 7, pagina * 7 + 7));
    },[pagina]);

    return {
        pagina,
        diasVisiveis,
        diasDaSemana,
        proximaSemana,
        semanaAnterior
    };
}