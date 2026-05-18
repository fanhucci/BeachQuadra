'use client'

import useQuadraDetail from "./useQuadraDetail"
import Agenda from "@/components/agenda";

export default function QuadraDetailPage(){

    const { quadra,id, mostrarAgendamento} = useQuadraDetail();   


    if(!quadra) return <p>Quadra não encontrada</p>

    return(
        <Agenda
            dados={quadra}
            contexto="agenda"
            idQuadraEspecifica={id}
            aoSelecionar={mostrarAgendamento}
        />
    )
}

