'use client'

import Agenda from "@/components/agenda"
import useAgenda from "./useAgenda";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { X } from "lucide-react";

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
            <section className=" flex flex-row flex-1 gap-4">
                <Agenda
                    dados={dados}
                    aoSelecionar={selecionarHorario}
                    selecionados={horarioSelecionado}
                />
                <div className="flex flex-row flex-wrap p-2 gap-4">
                    {
                        horarioSelecionado.map(r=>(
                            <SelectedSlotButton
                                horario={r.horario}
                                remover={()=>removerHorarioSelecionado(r)}
                            />
                        ))
                    }
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
            className="bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-full transition-all duration-200"
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