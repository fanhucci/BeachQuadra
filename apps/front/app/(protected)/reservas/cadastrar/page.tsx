'use client'

import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){
    const {dados, diasMeses, horarioSemana, pagina, semanaAnterior, proximaSemana, salvarReservas} = useCadastroReservas();
    
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const diasVisiveis = diasMeses.slice(pagina * 7, pagina * 7 + 7);

    return (
        <div className="flex-1 w-full h-full flex flex-col bg-white overflow-hidden">

            
            <div className="p-4 flex justify-between items-center border-b shrink-0">
                
                <button
                    onClick={semanaAnterior}
                    disabled={pagina === 0}
                    className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-30 text-sm"
                >
                    ← Anterior
                </button>
                <h2 className="text-lg font-semibold text-gray-700">Selecionar horário</h2>
                <button
                    onClick={proximaSemana}
                    disabled={(pagina + 1) * 7 >= diasMeses.length}
                    className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-30 text-sm"
                >
                    Próxima →
                </button>
            </div>

           
            <div className="flex-1 w-full p-2 min-h-0"> 
                <p>{JSON.stringify(dados)}</p>
                
                <table className="w-full h-full border-separate border-spacing-0 text-xs table-auto">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-1 border-b text-gray-600 font-semibold whitespace-nowrap w-16">
                                Hora
                            </th>
                            {diasVisiveis.map((dia, index) => (
                                <th key={dia} className="p-1 border-b text-center whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase text-gray-400">{tableHeaders[index]}</span>
                                        <span className="font-bold">{dia}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {horarioSemana.map((hora) => (
                            <tr key={hora}>
                                <td className="border-b bg-gray-50 text-center font-medium text-gray-700 whitespace-nowrap border-r">
                                    {hora}
                                </td>

                                {diasVisiveis.map((dia) => {
                                    const slot = dados[dia]?.[hora];
                                    const permitido = slot?.permitido;

                                    return (
                                        <td key={dia + hora} className="border-b border-l p-0.5">
                                            <button
                                                onClick={()=>salvarReservas()}
                                                disabled={!permitido}
                                                className={`
                                                    h-full w-full flex items-center justify-center rounded text-[10px]
                                                    transition-all duration-150
                                                    ${
                                                        permitido
                                                            ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                                                            : "bg-red-50 text-red-300 opacity-50"
                                                    }
                                                `}
                                            >
                                                {slot?.quadras?.length ?? 0} quadras
                                            </button>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t shrink-0">
                <button
                    onClick={salvarReservas}
                    className="w-full h-10 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                    Reservar
                </button>
            </div>

        </div>
    );
}