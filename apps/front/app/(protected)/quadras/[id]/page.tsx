'use client'

import LoadingSpinner from "@/components/loadingSpinner";
import useQuadraDetail from "./useQuadraDetail"
import Agenda from "@/components/agenda";

export default function QuadraDetailPage(){

    const {loading, quadra,id, mostrarAgendamento} = useQuadraDetail();   

    if(loading) return <LoadingSpinner/>

    if(!quadra) return <p>Quadra não encontrada</p>

    return(
        <Agenda
            dados={quadra}
            idQuadraEspecifica={id}
            aoSelecionar={mostrarAgendamento}
        />
    )
}

