'use client'

import { apiRequest } from "@/utils/apiHandler"
import { NovaReserva, Quadra } from "@app/shared";
import { useEffect, useState } from "react";

type SlotHorario = {
    horario:Date;
    permitido:boolean;
    id_agendamento?:number;
    disponivel:number[];
}

type TiposQuadra = 'individual'|'duplas';

export default function useAgenda(){

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const diaSemana = hoje.getDay(); 
    const diferencaParaSegunda = diaSemana === 0 ? 6 : diaSemana - 1;
    const segundaFeira = new Date(hoje);
    segundaFeira.setDate(hoje.getDate() - diferencaParaSegunda);

    const [data,setData] = useState<Date>(new Date(segundaFeira));

    const [dados, setDados] = useState<SlotHorario[]>([]);
    const [tipo,setTipo] = useState<TiposQuadra>('individual');
    const [horarioSelecionado,setHorarioSelecionado] = useState<NovaReserva[]>([]);
    

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel?data=${data.toISOString()}&tipo=${tipo}`);
        setDados(slots);
    }   

    async function salvarReservas() {
        
    }

    const selecionarHorario = (slot:SlotHorario) => {
    
        setHorarioSelecionado((prev)=>{

            const jaSelecionado = prev.find(
                (r)=> new Date(r.horario).getTime() === new Date(slot.horario).getTime()
            ) 
            
            
            if(jaSelecionado){
                return prev.filter(r => new Date(r.horario).getTime() !== new Date(slot.horario).getTime());
            }

            const id_quadra = slot.disponivel[0];

            if(!id_quadra) return prev;

            return[
                ...prev,
                {
                    id_quadra,
                    horario:slot.horario
                }
            ]
            
        })
    }

    const removerHorarioSelecionado = (slotHorario:NovaReserva)=>{
        setHorarioSelecionado((prev)=>{
            return prev.filter(r => new Date(r.horario).getTime() !== new Date(slotHorario.horario).getTime());
        })
    }

 
    const proximaSemana = ()=>{
        const proximaSemana = new Date(data);

        proximaSemana.setDate(proximaSemana.getDate()+7);

        setData(proximaSemana);
    }
    
    const semanaAnterior = ()=>{
        const novaData = new Date(data);

        novaData.setDate(novaData.getDate()-7)

        if (novaData.getTime()>=segundaFeira.getTime()) {
            setData(novaData);
        }
    }



    useEffect(()=>{
        carregarDiasLivres();
    },[tipo,data])

    return {
        dados,
        horarioSelecionado,
        tipo,
        selecionarHorario,
        salvarReservas,
        proximaSemana,
        semanaAnterior,
        setTipo,
        removerHorarioSelecionado

    };
}