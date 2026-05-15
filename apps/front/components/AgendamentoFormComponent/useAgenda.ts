'use client'

import { apiRequest } from "@/utils/apiHandler"
import { useEffect, useState } from "react";

type TiposQuadra = 'individual'|'duplas';

type QuadraDisponivel = {
    id_quadra:number;
    tipo:TiposQuadra;
    valor:number;
}

export type SlotHorario = {
    horario:Date;
    permitido:boolean;
    id_agendamento?:number;
    disponivel:QuadraDisponivel[];
}

export type HorarioSelecionado = {
    horario:Date;
    quadra:QuadraDisponivel;
}

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
    const [horarioSelecionado,setHorarioSelecionado] = useState<HorarioSelecionado[]>([]);
    

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel?data=${data.toISOString()}&tipo=${tipo}`);
        setDados(slots);
    }   

    async function salvarReservas() {
        
    }

    const selecionarHorario = (slot: SlotHorario) => {

        setHorarioSelecionado((prev) => {
            const quadraAtual = slot.disponivel[0]; 
            if (!quadraAtual) return prev;

            const jaSelecionado = prev.find(
                (r) => 
                    new Date(r.horario).getTime() === new Date(slot.horario).getTime() &&
                    r.quadra.id_quadra === quadraAtual.id_quadra
            );

            if (jaSelecionado) {
                return prev.filter(r => 
                    !(new Date(r.horario).getTime() === new Date(slot.horario).getTime() && 
                    r.quadra.id_quadra === quadraAtual.id_quadra)
                );
            }


            return [
                ...prev,
                {
                    horario: slot.horario,
                    quadra: quadraAtual
                }
            ];
        });
    }

    const removerHorarioSelecionado = (slotHorario: HorarioSelecionado) => {
        setHorarioSelecionado((prev) => 
            prev.filter(r => 
                new Date(r.horario).getTime() !== new Date(slotHorario.horario).getTime() || 
                r.quadra.id_quadra !== slotHorario.quadra.id_quadra
            )
        );
    };

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

    const valorTotal = horarioSelecionado.reduce((acc,item)=> acc + Number(item.quadra.valor),0);

    return {
        dados,
        valorTotal,
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