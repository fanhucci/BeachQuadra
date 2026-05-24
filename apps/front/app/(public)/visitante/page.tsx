'use client'

import AgendamentoFormComponent from "@/components/AgendamentoFormComponent/AgendamentoForm"
import HelpButton from "@/components/helpButton"

export default function VisitantePage(){

    return(
        <>
            <HelpButton
                steps={[
                {
                    element:"",
                    popover:{
                    title:"",
                    description:""
                    }
                }
                ]}
            />

            <AgendamentoFormComponent
                context="visitante"
            />
        </>
    )
}