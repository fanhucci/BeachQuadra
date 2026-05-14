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
                <div className="grid grid-cols-5 gap-4 p-4">
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
            className="bg-red-200 text-red-400 rounded-3xl"
        >
            {
                new Date(horario).toLocaleString('pt-br',{
                    day:'2-digit',
                    month:'2-digit',
                    hour:'2-digit',
                    minute:'2-digit',
                    timeZone:'utc'
                }) 
            }
            <X size={10} />
        </SubmitButton>
    )
   
}