'use client'

import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler"
import { NovaReserva, NovoAgendamento } from "@app/shared";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useAgenda(){

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const diaSemana = hoje.getDay(); 
    const diferencaParaSegunda = diaSemana === 0 ? 6 : diaSemana - 1;
    const segundaFeira = new Date(hoje);
    segundaFeira.setDate(hoje.getDate() - diferencaParaSegunda);

    const router = useRouter();

    const [dados, setDados] = useState<any>([]);
    const [tipo,setTipo] = useState('individual');
    const [horarioSelecionado,setHorarioSelecionado] = useState<NovaReserva[]>([]);

    const [data,setData] = useState(new Date(segundaFeira));

    // async function salvarReservas(){
    //     //verificar se está  logado
    //     try {
    //         const agendamento = await apiRequest(`/agendamento/${id}`,{
    //             method:"POST",
    //             body:JSON.stringify(horarioSelecionado)
    //         })
    //         toast.success('Horarios reservados com sucesso');
    //         router.push(`/agendamento/${agendamento}`);
    //     } catch (error) {
    //         toast.error(error instanceof Error? error.message : "Erro inesperado");
    //     }
    // }

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel?data=${data.toISOString()}&tipo=${tipo}`);
        setDados(slots);
    }


    const selecionarHorario = (slot) => {
    
        setHorarioSelecionado((prev)=>{

            const indiceExistente = prev.reservas.find(
                (r)=> r.horario === slot.horario
            ) 
            
            if(indiceExistente){
                return{
                    ...prev,
                    reservas: prev.reservas.filter(r=>r.horario !== slot.horario),
                }
            }

            const id_quadra = slot.disponivel[0];

            if(!id_quadra) return prev;

            return {
                ...prev,
                reservas:[
                    ...prev.reservas,
                    {
                        id_quadra,
                        horario:slot.horario
                    }
                ],

            }
            
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
        //salvarReservas,
        proximaSemana,
        semanaAnterior,
        setTipo,
    };
}