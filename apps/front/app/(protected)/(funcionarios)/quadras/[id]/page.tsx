'use client'

import NaoEncontrado from "@/components/erros/naoEncontrado";
import useQuadraDetail from "./useQuadraDetail"
import Agenda from "@/components/agenda";
import { CalendarDays, FileDown } from "lucide-react";
import SubmitButton from "@/components/buttonComponents/submitButton";
import CustomInput from "@/components/inputsComponents/customInput";
import { useState } from "react";
import { toast } from "sonner";
import { gerarPDFAgenda } from "@/utils/pdfHandler";

export default function QuadraDetailPage(){

    const { quadra,loading, mostrarAgendamento} = useQuadraDetail();   
    const [dataSelecionada, setDataSelecionada] = useState<string>(new Date().toISOString().split('T')[0]);

    const handleExportarPDF = ()=>{
        if(!quadra){
            toast.error('Erro ao gerar PDF.')
            return;
        }
        gerarPDFAgenda(quadra)
    }

    if(!quadra && !loading) return <NaoEncontrado/>

    return(

        <section className="w-full h-screen bg-gray-50/50 overflow-hidden flex flex-col">
            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
                
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                            <CalendarDays size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Agenda de Atendimentos - {quadra[0]?.agendamentos?.[0]?.nome_quadra || "Quadra"}</h2>
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
                        dados={quadra}
                        contexto="agenda"
                        idQuadraEspecifica={quadra?.id_quadra}
                        aoSelecionar={mostrarAgendamento}
                    />
                </section>
            </div>
        </section>
        
    )
}

