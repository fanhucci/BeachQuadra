'use client'

import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";

interface HorarioDia {
    id_horario: number;
    dia_semana: number;
    horario_abertura: string;
    horario_fechamento: string;
    ativo: boolean;
}

export default function useHorario(){
    const [loading,setLoading] = useState(false);
    const [horario, setHorario] = useState<HorarioDia[]>([]);
    const [bloqueios,setBloqueios] = useState([]);

    async function carregarHorario(){
        try {
            setLoading(true);
            const dados = await apiRequest(`/horario`);
            setHorario(dados.horario);
            setBloqueios(dados.bloqueios);
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro interno');
        }
        finally{
            setLoading(false);
        }
    }

    async function salvarHorario(){
        try {
            await apiRequest(`/horario`,{
                method:"PATCH",
                body:JSON.stringify(horario)
            })
            toast.success('Horário atualizado.');
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro interno');
        }
    }

    const handleChange = (id: number, campo: keyof HorarioDia, valor: string | boolean) => {
        setHorario((prev) => 
            prev.map((item) => 
                item.id_horario === id ? { ...item, [campo]: valor } : item
            )
        );
    };

    useEffect(()=>{
        carregarHorario();
    },[])

    return{
        loading,
        horario,
        bloqueios,
        handleChange,
        salvarHorario
    }
}