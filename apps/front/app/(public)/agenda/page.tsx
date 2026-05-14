'use client'

import Agenda from "@/components/agenda"
import useAgenda from "./useAgenda";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { X, CalendarDays } from "lucide-react";
import { useMemo } from "react";

export default function AgendaPage() {
    const {
        dados,
        horarioSelecionado,
        semanaAnterior,
        proximaSemana,
        selecionarHorario,
        removerHorarioSelecionado
    } = useAgenda();

    const horariosOrdenados = useMemo(() => {
        return [...horarioSelecionado].sort((a, b) => 
            new Date(a.horario).getTime() - new Date(b.horario).getTime()
        );
    }, [horarioSelecionado]);

    return (
        <main className="flex flex-col flex-1 p-4 gap-6">
            <div className="flex flex-row justify-between items-center bg-white p-2 rounded-lg shadow-sm border">
                <SubmitButton estilo="secundario" onClick={semanaAnterior} className="h-9">
                    Semana Anterior
                </SubmitButton>
                <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                    <CalendarDays size={18} /> Selecione seus horários
                </h2>
                <SubmitButton estilo="secundario" onClick={proximaSemana} className="h-9">
                    Próxima Semana
                </SubmitButton>
            </div>

            <section className="flex flex-col lg:flex-row flex-1 gap-6">

                <div className="flex-1 bg-white rounded-xl shadow-sm border p-2">
                    <Agenda
                        dados={dados}
                        aoSelecionar={selecionarHorario}
                        selecionados={horarioSelecionado}
                    />
                </div>

                <aside className="w-full lg:w-80 flex flex-col gap-3">

                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        Selecionados ({horarioSelecionado.length})
                    </h3>
                    
                    <div className="flex flex-wrap lg:flex-col gap-2">
                        {horariosOrdenados.map(r => (
                            <SelectedSlotButton
                                key={r.horario.toString()}
                                horario={r.horario}
                                remover={() => removerHorarioSelecionado(r)}
                            />
                        ))}
                        
                        {horarioSelecionado.length === 0 && (
                            <p className="text-sm text-gray-400 italic">Nenhum horário selecionado</p>
                        )}
                    </div>

                    {horarioSelecionado.length > 0 && (
                        <SubmitButton estilo="primario" className="mt-4 w-full">
                            Confirmar Agendamento
                        </SubmitButton>
                    )}
                </aside>
            </section>
        </main>
    )
}

type SelectedSlotButtonProps = {
    horario:Date;
    remover:()=>void;
}

function SelectedSlotButton({ horario, remover }: SelectedSlotButtonProps) {
    return (
        <button
            onClick={remover}
            className="group flex items-center justify-between gap-3 px-3 py-1.5 
                       bg-red-50 hover:bg-red-100 border border-red-100 
                       text-red-600 rounded-full transition-all duration-200"
        >
            <span className="text-xs font-medium">
                {new Date(horario).toLocaleString('pt-br', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'utc'
                })}
            </span>
            <X size={14} className="text-red-400 group-hover:text-red-600 transition-colors" />
        </button>
    )
}