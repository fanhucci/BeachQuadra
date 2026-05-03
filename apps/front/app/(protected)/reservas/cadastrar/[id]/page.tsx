'use client'

import { useParams } from "next/navigation";
import CadastroAgendamentoForm from "@/components/cadastroAgendamentoForm";


export default function CadastroReservasPage(){
    const {id} = useParams();
    return (
        <CadastroAgendamentoForm
            id={Number(id)}
        />
    );
}