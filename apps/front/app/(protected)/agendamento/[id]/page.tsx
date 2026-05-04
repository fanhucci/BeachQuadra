'use client'

import useDetailAgendamento from "./useDetailAgendamento"

export default function AgendamentoDetailPage(){
    const {agendamento,status, setStatus, alterarStatus} = useDetailAgendamento();

    if(!agendamento) return <>Carregando...</>

    const cliente = agendamento.cliente;
    const responsavel = agendamento.criado_por;
    const reservas = agendamento.reservas;
    
    return (
        <div className="w-full h-full flex justify-center bg-gray-50 p-8">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border p-6 flex flex-col gap-6">

    
                <div className="flex justify-between items-start border-b pb-4">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Reserva #{cliente.id_agendamento}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Criado por <span className="font-medium">{responsavel.nome}</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Valor total</span>
                        <span className="text-lg font-semibold text-gray-800">R$ {agendamento.valor_total} </span>
                    </div>
                </div>

              
                <div>
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">Cliente</h2>
                    <div className="p-3 border rounded-md bg-gray-50 text-gray-700">
                        {cliente.nome}
                    </div>
                </div>

            
                <div>
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">Status da reserva</h2>
                    
                    <div className="flex gap-3 items-center">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-md px-3 py-2 bg-white"
                        >
                            <option value="pendente">Pendente</option>
                            <option value="confirmado">Confirmado</option>
                            <option value="cancelado">Cancelado</option>
                        </select>

                        <button
                            onClick={()=>alterarStatus(agendamento.id_agendamento)}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </div>

                
                <div>
                    <h2 className="text-sm font-semibold text-gray-600 mb-3">Horários reservados</h2>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                <th className="p-3 text-left">Quadra</th>
                                <th className="p-3 text-left">Data</th>
                                <th className="p-3 text-left">Hora</th>
                                <th className="p-3 text-left">Valor</th>
                                <th className="p-3 text-left">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reservas.map((r) => {
                                const data = new Date(r.horario);

                                const dia = data.toLocaleDateString('pt-BR');
                                const hora = data.toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                return (
                                    <tr key={r.id_reserva} className="border-t">
                                    <td className="p-3">Quadra {r.id_quadra}</td>
                                    <td className="p-3">{dia}</td>
                                    <td className="p-3">{hora}</td>
                                    <td className="p-3">R$ {r.valor}</td>
                                    <td className="p-3 capitalize">{r.status}</td>
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}