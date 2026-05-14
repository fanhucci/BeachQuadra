'use client'

import Agenda from "@/components/agenda"
import useAgenda from "./useAgenda";
import SubmitButton from "@/components/buttonComponents/submitButton";

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
                <div>
                    {
                        horarioSelecionado.map(r=>(
                            <>
                                { new Date(r.horario).toLocaleString('pt-br',{timeZone:'utc'})}
                            </>
                        ))
                    }
                </div>
            </section>
        
        </>
    )
}