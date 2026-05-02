'use client'

import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){

    const {dados,diasMeses,horarioSemana, pagina, semanaAnterior, proximaSemana} = useCadastroReservas();
    
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
    const diasVisiveis = diasMeses.slice(pagina * 7, pagina * 7 + 7) ;

    return (
        <div className="justify-center items-center p-8">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={semanaAnterior}
                    disabled={pagina === 0}
                    className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 disabled:opacity-30"
                >
                    ← Semana anterior
                </button>

                <h2 className="text-lg font-semibold text-gray-700">
                    Selecionar horário
                </h2>

                <button
                    onClick={proximaSemana}
                    disabled={(pagina + 1) * 7 >= diasMeses.length}
                    className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 disabled:opacity-30"
                >
                    Próxima semana →
                </button>
            </div>

           
            <div className="flex flex-1 w-[70%] overflow-auto border rounded-xl shadow-sm">
                <table className="w-full border-separate border-spacing-0 text-sm">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="p-3 border-b text-gray-600 font-semibold w-24">
                                Hora
                            </th>

                            {diasVisiveis.map((dia, index) => (
                                <th key={dia} className="p-3 border-b text-center">
                                    <div className="flex flex-col">
                                    <span className="text-gray-500 text-xs uppercase tracking-wide">
                                        {tableHeaders[index]}
                                    </span>
                                    <span className="font-semibold text-gray-800">
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
                            
                            <td className="p-3 border-b bg-gray-50 text-center font-medium text-gray-700">
                                {hora}
                            </td>

                            
                            {diasVisiveis.map((dia) => {
                                const slot = dados[dia]?.[hora];
                                const permitido = slot?.permitido;

                                return (
                                    <td
                                        key={dia + hora}
                                        className="border-b border-l p-2"
                                    >
                                        <div
                                        className={`
                                            h-10 flex items-center justify-center rounded-md text-xs font-medium
                                            transition-all duration-150
                                            ${
                                            permitido
                                                ? "bg-green-500 text-green-800 hover:bg-green-200 cursor-pointer shadow-sm"
                                                : "bg-red-400 text-red-700 opacity-70 cursor-not-allowed"
                                            }
                                        `}
                                        >
                                        {slot?.quadras?.length ?? 0} quadras
                                        </div>
                                    </td>
                                );
                            })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}