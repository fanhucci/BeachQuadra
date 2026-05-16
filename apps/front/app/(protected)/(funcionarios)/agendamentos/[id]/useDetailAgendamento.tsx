'use client'
import { apiRequest } from "@/utils/apiHandler"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface CobrancaDetail{
    id_cobranca:number;
    status:string;
    data_pagamento:string|null;
}

interface ClienteDetail{
    id_cliente:number;
    nome:string;
}

interface CriadorDetail{
    id_criador:number;
    nome:string;
    id_cargo:number;
}

interface ReservaDetail{
    id_reserva:number;
    id_quadra:number;
    valor:number;
    status:string;
    horario:string;
}

interface DetalhesAgendamento{
    id_agendamento:number;
    status:string;
    valor_total:number;
    cobranca: CobrancaDetail;
    cliente:ClienteDetail;
    criado_por:CriadorDetail;
    reservas:ReservaDetail[];
}

export default function useDetailAgendamento(){
    const {id} = useParams();
    const [loading,setLoading] = useState<boolean>(false);
    const [loadingButton,setLoadingButton] = useState<boolean>(false);
    const [agendamento,setAgendamento] = useState<DetalhesAgendamento|null>(null);

    async function carregarAgendamento(){
        try {
            setLoading(true);

            const dados = await apiRequest(`/agendamentos/${id}`);

            setAgendamento(dados);
            

        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao carregar dados.');
        }
        finally{
            setLoading(false);
        }
        
    }

    async function gerenciarCobranca(acao:string) {
        try {
            setLoadingButton(true);

            await apiRequest(`/cobrancas/${agendamento?.cobranca.id_cobranca}/${acao}`,{
                method:"PATCH"
            });

            toast.success('Agendamento atualizado com sucesso.');

            carregarAgendamento();

        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao carregar dados.');
        }
        finally{
            setLoadingButton(false);
        }
    }


    useEffect(()=>{
        const idNumerico = Number(id);

        if(id && !isNaN(idNumerico)){
            carregarAgendamento();
        }
    },[id]);

    return{
        loading,
        loadingButton,
        agendamento,
        gerenciarCobranca
    }
}