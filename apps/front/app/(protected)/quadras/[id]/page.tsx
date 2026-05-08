'use client'

import LoadingSpinner from "@/components/LoadingSpinner";
import useQuadraDetail from "./useQuadraDetail"
import Agenda from "@/components/agenda";

export default function QuadraDetailPage(){

    const {loading, quadra, dados} = useQuadraDetail();   

    if(loading) return <LoadingSpinner/>

    if(!quadra) return <p>Quadra não encontrada</p>

    return(
        <Agenda
            dados={dados}
            idQuadraEspecifica={quadra.id_quadra}
        />
    )
}

