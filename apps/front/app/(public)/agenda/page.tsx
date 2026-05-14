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
        //salvarReservas,
        setTipo,
        removerHorarioSelecionado
    } = useAgenda();

    const horariosOrdenados = useMemo(() => {
        return [...horarioSelecionado].sort((a, b) => 
            new Date(a.horario).getTime() - new Date(b.horario).getTime()
        );
    }, [horarioSelecionado]);

    return(
        <>
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
                <div>
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
                </div>
            </section>
        
        </>
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
            estilo="fantasma"
            onClick={remover}
            className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-full"
        >
            <span className="text-xs font-medium">
            {
                new Date(horario).toLocaleString('pt-br',{
                    day:'2-digit',
                    month:'2-digit',
                    hour:'2-digit',
                    minute:'2-digit',
                    timeZone:'utc'
                }) 
            }
            </span>
            <X size={10} />
        </SubmitButton>
    )
   
}