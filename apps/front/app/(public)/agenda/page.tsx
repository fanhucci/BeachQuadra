'use client'

import Agenda from "@/components/agenda"
import useAgenda from "./useAgenda";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { X } from "lucide-react";
import { useMemo } from "react";

export default function AgendaPage(){

    const {
        tipo,
        dados,
        horarioSelecionado,
        semanaAnterior,
        proximaSemana,
        selecionarHorario,
        salvarReservas,
        setTipo,
        removerHorarioSelecionado
    } = useAgenda();

    const horariosOrdenados = useMemo(() => {
        return [...horarioSelecionado].sort((a, b) => 
            new Date(a.horario).getTime() - new Date(b.horario).getTime()
        );
    }, [horarioSelecionado]);

    return(
        <div className="flex flex-col flex-1 h-full items-center">
            <div className="w-[80%] justify-around">
                <div className="flex flex-row justify-between p-2">
                    <SubmitButton 
                        estilo="secundario"
                        onClick={semanaAnterior}
                    >
                        Voltar
                    </SubmitButton>

                    <SubmitButton 
                        estilo="secundario"
                        onClick={proximaSemana}
                    >
                        Avançar
                    </SubmitButton>
                </div>
                <section className="flex flex-row flex-1 gap-4">
                    <Agenda
                        dados={dados}
                        aoSelecionar={selecionarHorario}
                        selecionados={horarioSelecionado}
                    />
                    <div className="flex flex-col w-[30%]">
                        <div className="flex-1 flex-wrap">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Selecionados ({horarioSelecionado.length})
                            </h3>
                            
                            <div className="flex flex-wrap gap-2">
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
                        </div>
                        <div className="flex-1/3 items-center">
                            <SubmitButton
                                estilo="primario"
                                onClick={salvarReservas}
                            >
                                Salvar
                            </SubmitButton>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

type SelectedSlotButtonProps = {
    horario:Date;
    remover:()=>void;
}

function SelectedSlotButton({
    horario,
    remover
}:SelectedSlotButtonProps){
    return(
        <SubmitButton
            estilo="pilula"
            onClick={remover}
        >
            <span className="leading-none">
                {new Date(horario).toLocaleString('pt-br', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'utc'
                })}
            </span>
            <X size={12} strokeWidth={3} />
        </SubmitButton>
    )
   
}