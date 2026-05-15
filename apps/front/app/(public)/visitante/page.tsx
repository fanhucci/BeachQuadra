'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
import { useEffect } from "react"
import { toast } from "sonner"

export default function VisitantePage(){

    useEffect(()=>{
        toast.success('Pagina de visitante')
    },[])
    return(
        <AgendamentoFormComponent
            context="visitante"
        />
    )
}