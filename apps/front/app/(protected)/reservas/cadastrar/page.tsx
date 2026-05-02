'use client'

import useCadastroReservas from "./useCadastroReservas";

export default function CadastroReservasPage(){
    const hook = useCadastroReservas();
    if(!hook) return<div>Carregando...</div>
    
    return(
        <div className="p-6">
            {/* Navegação */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={hook.semanaAnterior}
                    disabled={hook.pagina === 0}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
                >
                    ← Semana anterior
                </button>

                <button
                    onClick={hook.proximaSemana}
                    disabled={(hook.pagina + 1) * 7 >= hook.diasDaSemana.length}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
                >
                    Próxima semana →
                </button>
            </div>

            <div className="overflow-auto border rounded-lg shadow">
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Hora</th>
                            {hook.diasVisiveis.map(dia => (
                                <th key={dia} className="p-2 border text-center">
                                    {dia}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {horariosDoDia.map(hora => (
                            <tr key={hora}>
                                <td className="p-2 border font-medium text-center bg-gray-50">
                                    {hora}
                                </td>

                                {diasVisiveis.map(dia => {
                                    const slot = mapa[dia]?.[hora];
                                    const permitido = slot?.permitido;

                                    return (
                                        <td
                                            key={dia + hora}
                                            className={`
                                                p-2 border text-center transition
                                                ${permitido 
                                                    ? 'bg-green-200 hover:bg-green-300 cursor-pointer' 
                                                    : 'bg-red-200 cursor-not-allowed opacity-70'}
                                            `}
                                        >
                                            {slot?.quadras?.length ?? 0}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}