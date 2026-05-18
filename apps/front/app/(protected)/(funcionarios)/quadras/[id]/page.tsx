'use client'

import useQuadraDetail from "./useQuadraDetail"
import Agenda from "@/components/agenda";

export default function QuadraDetailPage(){

    const { quadra, mostrarAgendamento} = useQuadraDetail();   


    if(!quadra) return <p>Quadra não encontrada</p>

    return(
        <Agenda
            dados={quadra}
            contexto="agenda"
            idQuadraEspecifica={quadra.id_quadra}
            aoSelecionar={mostrarAgendamento}
        />
    )
}

