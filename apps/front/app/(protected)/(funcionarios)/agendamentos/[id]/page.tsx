'use client'

import { dinheiroMask } from "@/utils/mascaras";
import useDetailAgendamento from "./useDetailAgendamento"
import Campo from "@/components/inputsComponents/campo";
import SubmitButton from "@/components/buttonComponents/submitButton";

export default function AgendamentoDetailPage(){
    const {
        loading,
        loadingButton,
        agendamento,
        gerenciarCobranca
    } = useDetailAgendamento();

    if(!agendamento || loading) return <>Carregando...</>

    const { cobranca, cliente, criado_por, reservas} = agendamento;
    
    return (
        <div className="w-full h-full flex justify-center bg-gray-50 p-8">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border p-6 flex flex-col gap-6">

    
                <div className="flex justify-between items-start border-b pb-4">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">
                            Reserva #{agendamento.id_agendamento}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Criado por <span className="font-medium">{criado_por.nome}</span>
                        </p>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-sm text-gray-500">Valor total</span>
                        <span className="text-lg font-semibold text-gray-800">{dinheiroMask(agendamento.valor_total)} </span>
                    </div>
                </div>

              
                <div>
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">Cliente</h2>
                    <div className="p-3 border rounded-md bg-gray-50 text-gray-700">
                        {cliente.nome}
                    </div>
                </div>

            
                <div>
                    

                    <Campo
                        label="Status"
                        valor={agendamento.status}
                    />    
                
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

                                    const dia = data.toLocaleDateString('pt-BR',{
                                        timeZone: 'UTC'
                                    });
                                    const hora = data.toLocaleTimeString('pt-BR', {
                                        hour: '2-digit', 
                                        minute: '2-digit',
                                        hour12: false ,
                                        timeZone: 'UTC'
                                    });
                                    return (
                                        <tr key={r.id_reserva} className="border-t">
                                            <td className="p-3">Quadra {r.id_quadra}</td>
                                            <td className="p-3">{dia}</td>
                                            <td className="p-3">{hora}</td>
                                            <td className="p-3">{dinheiroMask(r.valor)}</td>
                                            <td className="p-3 capitalize">{r.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    
    
                    <SubmitButton
                        estilo="primario"
                        disabled={cobranca.status !== 'pendente' || loadingButton}
                        onClick={() => gerenciarCobranca('pagar')}
                    >
                        Confirmar Pagamento
                    </SubmitButton>

  
                    <SubmitButton
                        estilo="perigo"
                        disabled={cobranca.status !== 'pendente' || loadingButton}
                        onClick={() => gerenciarCobranca('cancelar')}
                    >
                        Cancelar Reserva
                    </SubmitButton>


                    <SubmitButton
                        estilo="secundario"
                        disabled={cobranca.status !== 'pendente' || loadingButton}
                        onClick={() => gerenciarCobranca('vencimento')}
                    >   
                        Forçar Vencimento
                    </SubmitButton>


                    <SubmitButton
                        estilo="secundario"
                        disabled={cobranca.status !== 'concluido' || loadingButton}
                        onClick={() => gerenciarCobranca('estornar')}
                    >
                        Estornar Dinheiro
                    </SubmitButton>
                </div>
            </div>
        </div>
    );
}