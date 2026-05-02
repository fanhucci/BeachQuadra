'use client'

import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){
    const {dados, diasMeses, horarioSemana, pagina, semanaAnterior, proximaSemana, salvarReservas} = useCadastroReservas();
    
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const diasVisiveis = diasMeses.slice(pagina * 7, pagina * 7 + 7);

    return (
        /* h-full garante que ele tente ocupar a altura do layout pai */
        /* overflow-hidden impede que a página inteira ganhe scroll */
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col bg-white">

            {/* HEADER - shrink-0 impede que ele diminua */}
            <div className="p-4 flex justify-between items-center border-b shrink-0">
                <button
                    onClick={semanaAnterior}
                    disabled={pagina === 0}
                    className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 disabled:opacity-30 text-sm"
                >
                    ← Anterior
                </button>

                <h2 className="text-lg font-semibold text-gray-700">
                    Selecionar horário
                </h2>

                <button
                    onClick={proximaSemana}
                    disabled={(pagina + 1) * 7 >= diasMeses.length}
                    className="px-4 py-2 rounded-lg border bg-white shadow-sm hover:bg-gray-50 disabled:opacity-30 text-sm"
                >
                    Próxima →
                </button>
            </div>

            {/* CONTAINER DA TABELA - flex-1 e min-h-0 são CRUCIAL para o scroll interno funcionar */}
            <div className="flex-1 min-h-0 w-full p-4 flex flex-col"> 
                
                {/* Wrapper do Scroll - Só ele terá scroll se a tabela for muito grande */}
                <div className="w-full h-full overflow-auto border rounded-lg shadow-sm bg-gray-50">
                    
                    <table className="table-auto min-w-full border-separate border-spacing-0 text-sm bg-white">
                        <thead className="bg-gray-50 sticky top-0 z-20">
                            <tr>
                                <th className="p-3 border-b text-gray-600 font-semibold whitespace-nowrap sticky left-0 bg-gray-50 z-30">
                                    Hora
                                </th>

                                {diasVisiveis.map((dia, index) => (
                                    <th key={dia} className="p-3 border-b text-center whitespace-nowrap">
                                        <div className="flex flex-col px-2 min-w-[100px]">
                                            <span className="text-gray-500 text-[10px] uppercase">
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

                        <tbody className="divide-y divide-gray-100">
                            {horarioSemana.map((hora) => (
                                <tr key={hora} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-3 bg-gray-50 text-center font-medium text-gray-700 whitespace-nowrap sticky left-0 z-10 border-r">
                                        {hora}
                                    </td>

                                    {diasVisiveis.map((dia) => {
                                        const slot = dados[dia]?.[hora];
                                        const permitido = slot?.permitido;

                                        return (
                                            <td key={dia + hora} className="p-1 border-l border-b">
                                                <div
                                                    className={`
                                                        h-10 w-full flex items-center justify-center rounded text-[11px] font-medium
                                                        transition-all duration-150
                                                        ${
                                                            permitido
                                                                ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer shadow-sm"
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

            {/* FOOTER - shrink-0 impede que o botão "suma" */}
            <div className="p-4 border-t shrink-0">
                <button
                    onClick={salvarReservas}
                    className="w-full h-11 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                    Reservar Agora
                </button>
            </div>

        </div>
    );
}