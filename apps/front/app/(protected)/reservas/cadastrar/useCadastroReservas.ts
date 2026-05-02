'use client'

import { apiRequest } from "@/utils/apiHandler"
import { NovaReservaDTO } from "@app/shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCadastroReservas(){
    const [dados, setDados] = useState<any>([]);
    const [diasMeses,setDiasMeses] = useState<string[]>([]);
    const [horarioSemana,setHorarioSemana] = useState<string[]>([]);
    const [pagina, setPagina] = useState<number>(0);
    const [horarioSelecionado,setHorarioSelecionado] = useState<NovaReservaDTO[]>([]);

    async function salvarReservas(){
        console.log(JSON.stringify(horarioSelecionado))
        // try {
        //     await apiRequest('/agendamento',{
        //         method:"POST",
        //         body:JSON.stringify(horarioSelecionado)
        //     })
        //     toast.success('Horarios reservados com sucesso');
        // } catch (error) {
        //     toast.error(error instanceof Error? error.message : "Erro inesperado");
        // }
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

    

    function selecionarHorario(valor){
        const {horario,quadras} = valor;
        
        setHorarioSelecionado((prev)=>{
            const indiceExistente = prev.findIndex(
                (r)=> r.horario === horario
            ) 
            
            if(indiceExistente!==-1){
                return{
                    ...prev,
                    reservas: prev.filter((_, i) => i !== indiceExistente)
                }
            }

            return {
                ...prev,
                reservas:[
                    ...prev,
                    {
                        id_quadra:quadras[0],
                        horario:horario
                    }
                ]
            }
            
        })
    }


    useEffect(()=>{
        carregarDiasLivres();
    },[]);

   
    return {
        pagina,
        dados,
        diasMeses,
        horarioSemana,
        horarioSelecionado,
        semanaAnterior,
        proximaSemana,
        selecionarHorario,
        salvarReservas
    };
}