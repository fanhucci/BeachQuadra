'use client'
import Agenda from "@/components/agenda";
import LinkButton from "@/components/buttonComponents/linkButton";
import CustomModal from "@/components/customModal";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AgendaPage(){
    const [modalOn,setModalOn] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);
    const [horarios,setHorarios] = useState<any[]|null>(null);
    const [slotSelecionado,setSlotSelecionado] = useState<any|null>(null);

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


    const abrirModal = (slot:any)=>{
        setSlotSelecionado(slot);
        setModalOn(true);
    }

    const fecharModal = ()=>{
        setSlotSelecionado(null);
        setModalOn(false);
    }

    useEffect(()=>{
        carregarHorarios();
    },[])

    if(!horarios) return;

    return(
        <main className="flex flex-col flex-1 items-center p-6 gap-6 bg-gray-50/30">
            <Agenda
                loading={loading}
                dados={horarios}
                contexto="agenda"
                aoSelecionar={(slot)=>abrirModal(slot)}
            />

            <CustomModal
                estado={modalOn}
                fechar={fecharModal}
                titulo="Reservas semanais"
                botoes={[
                    {
                        label:'Fechar',
                        estilo:'secundario',
                        onClick:fecharModal
                    }
                ]}
            >   
                <div className="flex flex-col gap-4 p-2">
                        
                    {slotSelecionado?.agendamentos.map(a=>(
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <h3 className="text-amber-800 font-semibold mb-2">Horário Reservado</h3>
                                <div className="space-y-1 text-sm text-zinc-700">
                                    <p><strong>ID Agendamento:</strong> {a.id_agendamento}</p>
                                    <p><strong>Cliente:</strong> {a.nome}</p>
                                    <p><strong>CPF:</strong> {a.cpf}</p>
                                    <p><strong>Email:</strong> {a.email}</p>
                                    <LinkButton
                                        className="w-fit"
                                        href={`/agendamentos/${a.id_agendamento}`}
                                        estilo="primario"
                                    >
                                        Detalhes
                                    </LinkButton>
                                </div>
                            </div>
                    ))}

                </div>
            </CustomModal>
        </main>
    )
}