'use client'

import Agenda from "@/components/agenda"
import useAgenda from "./useAgenda";

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
    } = useAgenda();

    return(
        <>
            <Agenda
                dados={dados}
                aoSelecionar={selecionarHorario}
                selecionados={horarioSelecionado.reservas}
            />
        
        </>
    )
}