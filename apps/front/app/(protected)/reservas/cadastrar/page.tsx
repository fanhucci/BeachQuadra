'use client'

import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){

    const {dados,diasMeses,horarioSemana, pagina, semanaAnterior, proximaSemana, salvarReservas} = useCadastroReservas();
    
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
    const diasVisiveis = diasMeses.slice(pagina * 7, pagina * 7 + 7) ;

    return (
        <div className="w-full h-full overflow-hidden flex flex-col bg-white">

           
            <div className="p-4 flex justify-between items-center border-b shrink-0">
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


<div className="flex-1 min-h-0 w-full flex flex-col items-center p-4"> 
    
    {/* Wrapper do Scroll: max-w-full impede que ele estoure o componente pai */}
    <div className="w-full max-w-full overflow-auto border rounded-lg shadow-sm bg-gray-50">
        
        <table className="table-auto min-w-full border-separate border-spacing-0 text-sm bg-white">
            <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                    {/* Coluna de Hora fixada ou com largura mínima controlada */}
                    <th className="p-3 border-b text-gray-600 font-semibold whitespace-nowrap sticky left-0 bg-gray-50 z-20">
                        Hora
                    </th>

                    {diasVisiveis.map((dia, index) => (
                        <th key={dia} className="p-3 border-b text-center whitespace-nowrap">
                            <div className="flex flex-col px-2">
                                <span className="text-gray-500 text-[10px] uppercase tracking-tighter">
                                    {tableHeaders[index]}
                                </span>
                                <span className="font-bold text-gray-800">
                                    {dia}
                                </span>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {horarioSemana.map((hora) => (
                    <tr key={hora} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 border-b bg-gray-50 text-center font-medium text-gray-700 whitespace-nowrap sticky left-0 z-10">
                            {hora}
                        </td>

                        {diasVisiveis.map((dia) => {
                            const slot = dados[dia]?.[hora];
                            const permitido = slot?.permitido;

                            return (
                                <td key={dia + hora} className="border-b border-l p-2 min-w-[120px]">
                                    <div
                                        className={`
                                            h-12 w-full flex items-center justify-center rounded-md text-xs font-medium
                                            transition-all duration-150
                                            ${
                                                permitido
                                                    ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer shadow-sm active:scale-95"
                                                    : "bg-red-50 text-red-400 opacity-60 cursor-not-allowed"
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

            <div className="p-4 border-t shrink-0">
                <button
                    onClick={salvarReservas}
                    className="w-full h-11 rounded-lg bg-blue-600 text-white"
                >
                    Reservar
                </button>
            </div>

        </div>
    );
}