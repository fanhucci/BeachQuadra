'use client'

import LoadingSpinner from "@/components/LoadingSpinner";
import useQuadraDetail from "./useQuadraDetail"

export default function QuadraDetailPage(){

    const {loading, quadra} = useQuadraDetail();   

    if(loading) return <LoadingSpinner/>

    if(!quadra) return <p>Quadra não encontrada</p>

    return(
        <div className="w-full h-full flex justify-center bg-gray-50 p-8">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow border overflow-hidden">

                <div className="p-6 border-b">
                    <h1 className="text-xl font-semibold text-gray-700">
                        Detalhe da Quadra
                    </h1>
                </div>

                <div className="grid grid-cols-5 gap-4 p-6 border-b text-sm">
                <Info label="Nome" value={quadra.nome} />
                <Info label="Tipo" value={quadra.tipo} />
                <Info label="Valor/Hora" value={`R$ ${quadra.valor}`} />
                <Status label="Ativa" ok={quadra.ativo} />
                <Status label="Disponível" ok={quadra.status} />
                </div>

              
                <div className="p-6">
                <h2 className="text-md font-semibold text-gray-700 mb-4">
                    Reservas desta quadra
                </h2>

                {quadra.reservas.length === 0 && (
                    <p className="text-gray-500 text-sm">Nenhuma reserva encontrada.</p>
                )}

                {quadra.reservas.length > 0 && (
                    <table className="w-full text-sm border">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                        <th className="p-3 text-left">Horário</th>
                        <th className="p-3 text-left">Valor</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3 text-right">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {quadra.reservas.map((r) => (
                        <tr key={r.id_reserva} className="border-t hover:bg-gray-50">
                            <td className="p-3">{r.horario}</td>
                            <td className="p-3">{r.valor}</td>

                            <td className="p-3 text-center">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium
                                ${r.status === 'ativo'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'}
                                `}
                            >
                                {r.status}
                            </span>
                            </td>

                            <td className="p-3 text-right">
                            <button className="px-3 py-1 rounded-md border text-xs hover:bg-gray-100">
                                Cancelar
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}
                </div>

            </div>
        </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
    return(
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">{label}</span>
            <span className="font-medium text-gray-700">{value}</span>
        </div>
    )
}

function Status({ label, ok }: { label: string; ok: boolean }) {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase">{label}</span>
            <span
                className={`mt-1 px-2 py-1 rounded-full text-xs font-medium w-fit
                ${ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                `}
            >
                {ok ? 'Sim' : 'Não'}
            </span>
        </div>
    )
}