'use client'

import { Check } from "lucide-react";
import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){
    const {dados, diasMeses, horarioSemana, pagina,horarioSelecionado, semanaAnterior, proximaSemana, selecionarHorario, salvarReservas} = useCadastroReservas();
    
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const diasVisiveis = diasMeses.slice(pagina * 7, pagina * 7 + 7);

    return (
        <div className="w-screen h-screen flex flex-col bg-gray-50">

            <div className="px-8 py-4 flex items-center justify-between bg-white border-b shrink-0">
                <button
                    onClick={semanaAnterior}
                    disabled={pagina === 0}
                    className="px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                    ← Anterior
                </button>

                <h2 className="text-base font-semibold text-gray-700">
                    Selecionar horário
                </h2>

                <button
                    onClick={proximaSemana}
                    disabled={(pagina + 1) * 7 >= diasMeses.length}
                    className="px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                    Próxima →
                </button>
            </div>

           
            <div className="flex-1 overflow-auto flex justify-center p-6">
                <div className="rounded-xl border bg-white shadow-sm p-4">
                    <table className="border-separate border-spacing-2 text-xs">
                        <thead>
                            <tr>
                                {diasVisiveis.map((dia, index) => (
                                    <th key={dia} className="pb-3 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] uppercase text-gray-400">
                                                {tableHeaders[index]}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-700">
                                                {dia}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {horarioSemana.map((hora) => (
                            <tr key={hora}>
                                {diasVisiveis.map((dia) => {
                                    const slot = dados[dia]?.[hora];
                                    const permitido = slot?.permitido;

                                    const isSelected = horarioSelecionado.reservas.some(
                                        (r) => r.horario === slot?.horario
                                    );

                                    return (
                                        <td key={dia + hora} className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => selecionarHorario(slot)}
                                                disabled={!permitido}
                                                className={`
                                                    w-10 h-10 rounded-md text-[11px] font-medium
                                                    flex items-center justify-center
                                                    transition-all border
                                                    ${
                                                        isSelected
                                                        ? "bg-blue-600 text-white border-blue-700"
                                                        : permitido
                                                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                                            : "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                                                    }
                                                `}
                                            >
                                                {isSelected? (<Check size={16} />) : hora}
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            
            {/* <div className="px-8 py-4 bg-white border-t flex justify-end shrink-0">
                <button
                    onClick={salvarReservas}
                    className="px-6 h-10 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                    Reservar
                </button>
            </div> */}
        </div>
    );
}