'use client'
import Agenda from "@/components/agenda";
import LinkButton from "@/components/buttonComponents/linkButton";
import CustomModal from "@/components/customModal";
import { apiRequest } from "@/utils/apiHandler";
import { cpfMask } from "@/utils/mascaras";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CalendarDays, FileDown, FileText, X } from "lucide-react";
import ErroInesperado from "@/components/erros/erroInesperado";
import SubmitButton from "@/components/buttonComponents/submitButton";
import CustomInput from "@/components/inputsComponents/customInput";
import { gerarPDFAgenda } from "@/utils/pdfHandler";

export default function AgendaPage(){
    const [modalOn, setModalOn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [horarios, setHorarios] = useState<any[]|null>(null);
    const [slotSelecionado, setSlotSelecionado] = useState<any|null>(null);
    const [dataSelecionada, setDataSelecionada] = useState<string>(new Date().toISOString().split('T')[0]);

    async function carregarHorarios(data?: string){
        try {
            setLoading(true);
            const query = data ? `?data=${data}` : '';
            const dados = await apiRequest(`/horario/agenda${query}`);
            setHorarios(dados);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : `Erro ao carregar agenda.`)
        } finally {
            setLoading(false);
        }
    }

    const abrirModal = (slot: any) => {
        setSlotSelecionado(slot);
        setModalOn(true);
    }

    const fecharModal = () => {
        setSlotSelecionado(null);
        setModalOn(false);
    }

    const handleExportarPDF = ()=>{
        if(!horarios){
            toast.error('Erro ao gerar PDF.')
            return;
        }
        gerarPDFAgenda(horarios)
    }

    useEffect(() => {
        carregarHorarios(dataSelecionada);
    }, [dataSelecionada])


    if (!horarios) return <ErroInesperado/>;

    return (
        <section className="w-full h-screen bg-gray-50/50 overflow-hidden flex flex-col">
            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
                
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Agenda de Atendimentos</h2>
                            <p className="text-xs text-gray-500">Monitore, gerencie e navegue pelos slots de horários</p>
                        </div>
                    </div>

                    <div className="flex items-end gap-3">
                        <div className="w-40">
                            <CustomInput
                                name="data"
                                label="Data de Consulta"
                                type="date"
                                value={dataSelecionada}
                                onChange={(e) => setDataSelecionada(e.target.value)}
                            />
                        </div>
                        <SubmitButton
                            type="button"
                            estilo="perigo"
                            onClick={handleExportarPDF}
                                    
                        >
                            <FileDown size={16} />
                            <span>Exportar PDF</span>       
                        </SubmitButton>
                    </div>
                </header>

                <section className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-4 min-h-0">
                    <Agenda
                        loading={loading}
                        dados={horarios || []}
                        contexto="agenda"
                        aoSelecionar={(slot) => abrirModal(slot)}
                    />
                </section>
            </div>

            <CustomModal
                estado={modalOn}
                fechar={fecharModal}
                titulo="Reservas Semanais"
                width="max-w-2xl"
                botoes={[
                    {
                        label: 'Fechar',
                        estilo: 'secundario',
                        onClick: fecharModal
                    }
                ]}
            >   

                <div className="flex flex-col max-h-[60vh] overflow-y-auto gap-4 p-2 w-full">
                    
                    {slotSelecionado?.agendamentos?.map((a: any) => (
                        <div key={a.id_agendamento} className="w-full bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 shadow-sm transition-all hover:bg-amber-50">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-amber-800 font-bold text-sm tracking-wide uppercase">Horário Reservado</h3>
                                <span className="text-xs font-mono bg-amber-200/50 text-amber-900 px-2 py-0.5 rounded-md font-semibold">
                                    #{a.id_agendamento}
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 pb-4 border-b border-amber-200/40">
                                <p><strong className="text-gray-500 font-medium">Cliente:</strong> <span className="font-semibold text-gray-900">{a.nome}</span></p>
                                <p><strong className="text-gray-500 font-medium">CPF:</strong> {cpfMask(a.cpf)}</p>
                                <p className="sm:col-span-2 truncate"><strong className="text-gray-500 font-medium">Email:</strong> {a.email}</p>
                            </div>

                            <div className="pt-3 flex justify-end">
                                <LinkButton
                                    className="h-8 text-xs font-semibold px-4 flex items-center justify-center rounded-lg shadow-sm bg-amber-600 hover:bg-amber-700 text-white transition-all active:scale-95"
                                    href={`/agendamentos/${a.id_agendamento}`}
                                    estilo="primario"
                                >
                                    Visualizar Ficha
                                </LinkButton>
                            </div>
                        </div>
                    ))}

                    {slotSelecionado?.agendamentos?.length === 0 && (
                        <p className="text-center py-6 text-sm text-gray-400 italic">Nenhum agendamento ativo para este horário.</p>
                    )}

                </div>
            </CustomModal>
        </section>
    )
}