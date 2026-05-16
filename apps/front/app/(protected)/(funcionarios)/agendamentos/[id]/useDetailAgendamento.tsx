'use client'
import { apiRequest } from "@/utils/apiHandler"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { toast } from "sonner";

// interface DetalhesAgendamento{

// }

export default function useDetailAgendamento(){
    const {id} = useParams();
    const [loading,setLoading] = useState<boolean>(false);
    const [loadingButton,setLoadingButton] = useState<boolean>(false);
    const [agendamento,setAgendamento] = useState(null);

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

            await apiRequest(`/cobranca/${agendamento.id_cobranca}/${acao}`);

            toast.success('Agendamento atualizado com sucesso.');

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