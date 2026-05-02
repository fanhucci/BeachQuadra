'use client'

import { apiRequest } from "@/utils/apiHandler"
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCadastroReservas(){
    const [dados, setDados] = useState<any>([]);
    const [diasMeses,setDiasMeses] = useState<string[]>([]);
    const [horarioSemana,setHorarioSemana] = useState<string[]>([]);
    const [pagina, setPagina] = useState<number>(0);

    async function salvarReservas(){
        try {
            await apiRequest('/agendamento',{
                method:"POST",
                body:JSON.stringify({})
            })
            toast.success('Horarios reservados com sucesso');
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

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


    
    function proximaSemana(){
        if ((pagina + 1) * 7 < diasMeses.length) {
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

   
    return {
        pagina,
        dados,
        diasMeses,
        horarioSemana,
        semanaAnterior,
        proximaSemana,
        salvarReservas
    };
}