'use client'

import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){
    const {dados, diasMeses, horarioSemana, pagina,horarioSelecionado, semanaAnterior, proximaSemana, selecionarHorario, salvarReservas} = useCadastroReservas();
    
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const diasVisiveis = diasMeses.slice(pagina * 7, pagina * 7 + 7);

    return (
        <div className="w-full h-full flex flex-col bg-gray-50">

            <div className="px-8 py-4 flex items-center justify-between bg-white border-b shrink-0 ">
                <button
                    onClick={semanaAnterior}
                    disabled={pagina === 0}
                    className="px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                    <ArrowLeft /> Semana Anterior
                </button>

                <h2 className="text-base font-semibold text-gray-700">
                    Selecionar horário
                </h2>

                <button
                    onClick={proximaSemana}
                    disabled={(pagina + 1) * 7 >= diasMeses.length}
                    className="px-3 py-1.5 text-sm rounded-md border bg-white hover:bg-gray-100 disabled:opacity-30"
                >
                    Próxima Semana <ArrowRight />
                </button>
            </div>

                    
            <div className="flex flex-row flex-1 w-full">
                <div className="flex-1 flex justify-center px-6 py-4">
                    <div className="w-full max-w-6xl border rounded-xl bg-white shadow-sm p-3 flex flex-col">

                        <div
                            className="grid gap-2 mb-2 text-center"
                            style={{ gridTemplateColumns: `repeat(${diasVisiveis.length}, 1fr)` }}
                        >
                            {diasVisiveis.map((dia, index) => (
                                <div key={dia} className="flex flex-col">
                                    <span className="text-[10px] uppercase text-gray-400">
                                        {tableHeaders[index]}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {dia}
                                    </span>
                                </div>
                            ))}
                        </div>

                        
                        <div
                            className="flex-1 grid gap-2 content-start overflow-hidden"
                            style={{
                                gridTemplateColumns: `repeat(${diasVisiveis.length}, 1fr)`,
                                gridTemplateRows: `repeat(${horarioSemana.length}, 1fr)`,
                            }}
                        >
                            {horarioSemana.map((hora) =>
                                diasVisiveis.map((dia) => {
                                    const slot = dados[dia]?.[hora];
                                    const permitido = slot?.permitido;

                                    const isSelected = horarioSelecionado.reservas.some(
                                        (r) => r.horario === slot?.horario
                                    );

                                    return (
                                        <button
                                            key={dia + hora}
                                            type="button"
                                            onClick={() => selecionarHorario(slot)}
                                            disabled={!permitido}
                                            className={`
                                                w-full aspect-square rounded-lg text-[11px] font-medium
                                                flex items-center justify-center
                                                transition border
                                                ${
                                                isSelected
                                                    ? "bg-blue-600 text-white border-blue-700"
                                                    : permitido
                                                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                                                    : "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                                                }
                                            `}
                                            >
                                            {isSelected ? <Check size={14}/> : hora}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

            
                <div className="flex flex-col justify-center b-5 p-2">
                    <div>
                        menu?
                    </div>
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