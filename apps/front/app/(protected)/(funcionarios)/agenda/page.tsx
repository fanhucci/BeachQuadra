'use client'
import Agenda from "@/components/agenda";
import CustomModal from "@/components/customModal";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AgendaPage(){
    const [modalOn,setModalOn] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [horarios,setHorarios] = useState<any[]|null>(null);

    async function carregarHorarios(){
        try {
            setLoading(true);
            const dados = await apiRequest(`/horario/agenda`);
            setHorarios(dados);
        } catch (error) {
            toast.error(error instanceof Error? error.message : `Erro ao carregar agenda.`)
        }
        finally{
            setLoading(false);
        }
    }

    const abrirModal = ()=>{
        setModalOn(true);
    }

    const fecharModal = ()=>{
        setModalOn(false);
    }

    useEffect(()=>{
        carregarHorarios();
    },[])

    if(!horarios) return;

    return(
        <main>
            <Agenda
                loading={loading}
                dados={horarios}
                contexto="agenda"
                aoSelecionar={abrirModal}
            />

            <CustomModal
                estado={modalOn}
                fechar={fecharModal}
                titulo=""
            >   
            teste

            </CustomModal>
        </main>
    )
}