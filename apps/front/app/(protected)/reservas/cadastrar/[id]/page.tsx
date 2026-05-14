'use client'

import useCadastroReservas from "@/app/(protected)/reservas/cadastrar/[id]/useCadastroReservas";
import Agenda from "@/components/agenda";
import CustomSwitch from "@/components/inputsComponents/customSwitch";
import { ArrowLeft, ArrowRight } from "lucide-react";


export default function CadastroReservasPage(){

    const {tipo, dados,horarioSelecionado, semanaAnterior, proximaSemana, selecionarHorario, salvarReservas, setTipo} = useCadastroReservas();
 
    return (
        <div className="w-full h-full flex flex-col bg-gray-50">

            <div className="px-8 py-4 flex items-center justify-between bg-white border-b shrink-0 ">
                <button
                    onClick={semanaAnterior}
                    className="px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                    <ArrowLeft /> Ant.
                </button>

                <h2 className="text-base font-semibold text-gray-700">
                    Selecionar horário
                </h2>

                <button
                    onClick={proximaSemana}
                    className="px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                    Próx. <ArrowRight />
                </button>
            </div>

                    
            <div className="flex flex-row flex-1 w-full">
                <div className="flex-1 flex justify-center px-6 py-4">
                    <Agenda
                        dados={dados}
                        aoSelecionar={selecionarHorario}
                        selecionados={horarioSelecionado.reservas}
                    />
                </div> 

                

            
                <div className="flex flex-col justify-center b-5 p-2">
                    
                    <CustomSwitch 
                        estadoA={{label: 'Individual', value:'individual'}} 
                        estadoB={{label:'Duplas', value:'dupla'}} 
                        name="tipo" 
                        onChange={(valor) => setTipo(valor)}
                        selected={tipo}
                    />
                    
                    <button
                        onClick={salvarReservas}
                        className="px-6 h-10 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
}