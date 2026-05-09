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

interface Bloqueio {
    id_bloqueio:number;
    inicio_bloqueio:Date;
    fim_bloqueio:Date;
    motivo:string;
}

export default function useHorario(){
    const estadoInicial = {
        inicio_bloqueio:"",
        fim_bloqueio:"",
        motivo:""
    }
    const [loading,setLoading] = useState(false);
    const [horario, setHorario] = useState<HorarioDia[]>([]);
    const [bloqueios,setBloqueios] = useState<Bloqueio[]>([]);
    const [modalBloqueio,setModalBloqueio] = useState(false);
    const [formData,setFormData] = useState(estadoInicial)

    async function carregarHorario(){
        try {
            setLoading(true);
            const dados = await apiRequest(`/horario`);
            setHorario(dados.horario);
            setBloqueios(dados.bloqueios);
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro carregando horário');
        }
        finally{
            setLoading(false);
        }
    }

    async function salvarHorario(){
        try {
            await apiRequest(`/horario`,{
                method:"PUT",
                body:JSON.stringify(horario)
            })
            toast.success('Horário atualizado.');
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro salvando horário');
        }

    }

    async function salvarBloqueio(){
        try {
            await apiRequest(`/bloqueio`,{
                method:"POST",
                body:JSON.stringify(formData)
            })    
            toast.success('Bloqueio salvo.');
            toggleModal();
            await carregarHorario();
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao adicionar bloqueio');
        }
    }

    async function removerBloqueio(id:number){
        try {
            await apiRequest(`/bloqueio/${id}`,{
                method:"DELETE",
            })    
            toast.success('Bloqueio removido');
            await carregarHorario();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao remover bloqueio');
        }
    }

    const toggleModal = ()=>{

        setModalBloqueio(prev=>{
            const novoEstado = !prev;

            if(novoEstado===false) setFormData(estadoInicial);
            
            return novoEstado
        });
    }

    const handleChangeBloqueio = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
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
        salvarHorario,
        salvarBloqueio,
        removerBloqueio,
        toggleModal,
        handleChangeBloqueio,
        formData,
        modalBloqueio
    }
}