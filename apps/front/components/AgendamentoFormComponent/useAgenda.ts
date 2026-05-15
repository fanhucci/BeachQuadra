'use client'

import { apiRequest } from "@/utils/apiHandler"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

    const router = useRouter();
        
    const [data,setData] = useState<Date>(new Date(segundaFeira));
    const [dados, setDados] = useState<SlotHorario[]>([]);
    const [tipo,setTipo] = useState<TiposQuadra>('individual');
    const [horarioSelecionado,setHorarioSelecionado] = useState<HorarioSelecionado[]>([]);
    const [loading,setLoading] = useState<boolean>(false);

    async function carregarDiasLivres() {
        try {
            setLoading(true);
            const slots = await apiRequest(`/horario-disponivel?data=${data.toISOString()}&tipo=${tipo}`);
            setDados(slots);
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao carregar horarios.');
        }
        finally{
            setLoading(false);
        }
    }   

    async function salvarReservas(id:number){
        const reservas = horarioSelecionado.map(r=>({
            id_quadra:r.quadra.id_quadra,
            horario:r.horario
        }));

        const payload = {
            id_pessoa:id,
            reservas:reservas
        }

        try {
            setLoading(true);
            const agendamento = await apiRequest(`/agendamentos`,{
                method:'POST',
                body:JSON.stringify(payload)
            })
            toast.success('Horários agendados com sucesso.');
            router.replace(`/agendamentos/${agendamento}`);
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao salvar agendamento.');
        }
        finally{
            setLoading(false);
        }
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
        const horariosNaMemoria = localStorage.getItem('memoria');

        if(!horariosNaMemoria){
            carregarDiasLivres();
        }

    },[tipo,data]);


    const sincronizarHorariosMemoria = async () => {
        const horariosNaMemoria = localStorage.getItem('memoria');

        try {
            setLoading(true);

            const dadosAtuais = await apiRequest(`/horario-disponivel?data=${data.toISOString()}&tipo=${tipo}`);

            if (!dadosAtuais) return; 

            setDados(dadosAtuais); 

            const horariosRascunho = JSON.parse(horariosNaMemoria!) as HorarioSelecionado[];

            const horariosValidados = horariosRascunho.filter((rascunho) => {
                const slotCorrespondente = dadosAtuais.find(
                    (slot:SlotHorario) => new Date(slot.horario).getTime() === new Date(rascunho.horario).getTime()
                );

                if (!slotCorrespondente) return false;

                const quadraAindaDisponivel = slotCorrespondente.disponivel.some(
                    (quadra:QuadraDisponivel) => quadra.id_quadra === rascunho.quadra.id_quadra
                );

                return quadraAindaDisponivel;
            });

            setHorarioSelecionado(horariosValidados);

            if (horariosValidados.length > 0) {
                toast.success('Horarios recuperados com sucesso.');
            }

            if (horariosValidados.length < horariosRascunho.length) {
                toast.warning("Algum dos horários selecionados foi reservado recentemente e removido da lista.");
            }

        } catch (error) {
            toast.error('Não foi possivel recuperar os horarios.');
        } finally {
            setLoading(false);
            localStorage.removeItem('memoria');
        }
    };

    useEffect(() => {
        const horariosNaMemoria = localStorage.getItem('memoria');

        if (!horariosNaMemoria) return;       

        sincronizarHorariosMemoria();
    }, []);

    const valorTotal = horarioSelecionado.reduce((acc,item)=> acc + Number(item.quadra.valor),0);

    return {
        dados,
        valorTotal,
        horarioSelecionado,
        tipo,
        loading,
        selecionarHorario,
        salvarReservas,
        proximaSemana,
        semanaAnterior,
        setTipo,
        removerHorarioSelecionado

    };
}