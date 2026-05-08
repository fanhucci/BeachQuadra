'use client'

import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler"
import { NovoAgendamentoDTO } from "@app/shared";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useCadastroReservas(){
    const hoje = new Date();
    hoje.setHours(0,0,0,0);
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

    const [data,setData] = useState(new Date(hoje));

    async function salvarReservas(){
        try {
            const agendamento = await apiRequest(`/agendamento/${id}`,{
                method:"POST",
                body:JSON.stringify(horarioSelecionado)
            })
            toast.success('Horarios reservados com sucesso');
            router.push(`/agendamento/${agendamento}`);
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function carregarDiasLivres() {
        const slots = await apiRequest(`/horario-disponivel?data=${data.toISOString()}&tipo=${tipo}`);
        setDados(slots);
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
        const proximaSemana = new Date(data);
        proximaSemana.setDate(proximaSemana.getDate()+7);
        setData(proximaSemana);
    }
    
    function semanaAnterior(){
        if (hoje<=data) {
            const semanaAnterior = new Date(data);
            semanaAnterior.setDate(semanaAnterior.getDate()-7);
            setData(semanaAnterior);
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
    },[tipo,data])

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