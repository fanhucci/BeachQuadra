'use client'

import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler"
import { NovoAgendamentoDTO } from "@app/shared";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCadastroReservas(){
    const {user} = useUser();
    const {id} = useParams();
    const router = useRouter();
    const [dados, setDados] = useState<any>([]);
    const [diasMeses,setDiasMeses] = useState<string[]>([]);
    const [horarioSemana,setHorarioSemana] = useState<string[]>([]);
    const [pagina, setPagina] = useState<number>(0)
    const [tipo,setTipo] = useState('individual');
    const [horarioSelecionado,setHorarioSelecionado] = useState<NovoAgendamentoDTO>({
        id_pessoa:0,
        reservas:[],
        created_by:0
    });

    async function salvarReservas(){
        try {
            const agendamento = await apiRequest(`/agendamento/${id}`,{
                method:"POST",
                body:JSON.stringify(horarioSelecionado)
            })
            toast.success('Horarios reservados com sucesso');
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
            router.push('/');
        }
    }

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel?tipo=${tipo}`);
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
            const indiceExistente = prev.reservas.findIndex(
                (r)=> r.horario === horario
            ) 
            
            if(indiceExistente!==-1){
                return{
                    ...prev,
                    reservas: prev.reservas.filter((_, i) => i !== indiceExistente),
                }
            }

            return {
                ...prev,
                reservas:[
                    ...prev.reservas,
                    {
                        id_quadra:quadras[0],
                        horario:horario
                    }
                ],

            }
            
        })
    }


    useEffect(()=>{
        carregarDiasLivres();
    },[]);

    useEffect(()=>{
        if(user?.id_pessoa && id){
            setHorarioSelecionado((prev)=>({
                ...prev,
                id_pessoa:Number(id),
                created_by:user.id_pessoa
            }))
        }
    },[user,id])

    useEffect(()=>{
        if(user?.id_pessoa && id){
            setHorarioSelecionado((prev)=>({
                ...prev,
                id_pessoa:Number(id),
                created_by:user?.id_pessoa
            }))
        }
    },[user,id])

    useEffect(()=>{
        carregarDiasLivres();
    },[tipo])

    return {
        pagina,
        dados,
        diasMeses,
        horarioSemana,
        horarioSelecionado,
        semanaAnterior,
        proximaSemana,
        selecionarHorario,
        salvarReservas,
        setTipo,
        tipo
    };
}