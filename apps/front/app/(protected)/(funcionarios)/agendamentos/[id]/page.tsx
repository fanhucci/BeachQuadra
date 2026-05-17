'use client'

import { dinheiroMask } from "@/utils/mascaras";
import useDetailAgendamento from "./useDetailAgendamento"
import SubmitButton from "@/components/buttonComponents/submitButton";

export default function AgendamentoDetailPage(){
    const {
        loading,
        loadingButton,
        agendamento,
        gerenciarCobranca
    } = useDetailAgendamento();

    if (loading || !agendamento) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 gap-3">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium text-sm">Carregando detalhes da reserva...</p>
            </div>
        )
    }

    const { cobranca, cliente, criado_por, reservas } = agendamento;

    const getStatusCobrancaBadge = (status: string) => {
        const classes: Record<string, string> = {
            pendente: "bg-amber-50 text-amber-700 border-amber-200",
            concluido: "bg-emerald-50 text-emerald-700 border-emerald-200",
            cancelado: "bg-rose-50 text-rose-700 border-rose-200",
            vencido: "bg-gray-100 text-gray-600 border-gray-300",
            estornado: "bg-purple-50 text-purple-700 border-purple-200"
        }
        return classes[status] || "bg-gray-50 text-gray-600 border-gray-200";
    }

    return (
        <div className="w-full min-h-screen bg-gray-50/50 p-4 md:p-8 flex justify-center">
            <div className="w-full max-w-6xl flex flex-col gap-6">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-gray-100 rounded-xl p-6 shadow-sm gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-bold text-gray-900">Reserva #{agendamento.id_agendamento}</h1>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-gray-100 text-gray-700 border">
                                    {agendamento.status}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Operador: <span className="font-medium text-gray-600">{criado_por?.nome || 'Sistema'}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:items-end bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 w-full sm:w-auto">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Valor Total da Reserva</span>
                        <span className="text-xl font-extrabold text-gray-900">{dinheiroMask(agendamento.valor_total)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                Dados do Cliente
                            </h2>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-1">
                                <span className="text-xs text-gray-400 font-medium">Nome Completo</span>
                                <span className="text-base font-semibold text-gray-800">{cliente?.nome}</span>
                            </div>
                        </div>

                        <div className="h-200 overflow-y-scroll bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Horários Agendados
                            </h2>

                            <div className="border border-gray-100 rounded-xl overflow-hidden shadow-inner">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold border-b border-gray-100">
                                            <tr>
                                                <th className="p-4">Quadra</th>
                                                <th className="p-4">Data e Hora</th>
                                                <th className="p-4">Preço</th>
                                                <th className="p-4 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {reservas.map((r) => {
                                                const data = new Date(r.horario);
                                                const dia = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                                                const hora = data.toLocaleTimeString('pt-BR', {
                                                    hour: '2-digit', 
                                                    minute: '2-digit',
                                                    timeZone: 'UTC'
                                                });

                                                return (
                                                    <tr key={r.id_reserva} className="hover:bg-gray-50/50 transition">
                                                        <td className="p-4 font-semibold text-gray-800">Quadra {r.id_quadra}</td>
                                                        <td className="p-4 text-gray-600">
                                                            <div className="font-medium text-gray-800">{dia}</div>
                                                            <div className="text-xs text-gray-400">{hora}</div>
                                                        </td>
                                                        <td className="p-4 font-medium text-gray-900">{dinheiroMask(r.valor)}</td>
                                                        <td className="p-4 text-center">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                                                                r.status === 'ativo' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                                            }`}>
                                                                {r.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-6">
                        <div>
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                Situação Financeira
                            </h2>
                            
                            <div className={`p-4 border rounded-xl flex flex-col gap-2 shadow-sm ${getStatusCobrancaBadge(cobranca.status)}`}>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Status da Cobrança</span>
                                    <span className="text-xs font-extrabold uppercase tracking-widest px-2 py-0.5 bg-white/60 rounded border border-current">
                                        {cobranca.status}
                                    </span>
                                </div>
                                <div className="text-xs opacity-80 mt-1">
                                    {cobranca.data_pagamento ? (
                                        <span>Pago em: {new Date(cobranca.data_pagamento).toLocaleDateString('pt-BR')}</span>
                                    ) : (
                                        <span>Aguardando recebimento de valores.</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ações Disponíveis</span>

                            <SubmitButton
                                estilo="primario"
                                disabled={cobranca.status !== 'pendente' || loadingButton}
                                onClick={() => gerenciarCobranca('pagar')}
                            >
                                {loadingButton ? 'Processando...' : 'Confirmar Pagamento'}
                            </SubmitButton>

                            <SubmitButton
                                estilo="perigo"
                                disabled={cobranca.status !== 'pendente' || loadingButton}
                                onClick={() => gerenciarCobranca('cancelar')}
                            >
                                {loadingButton ? 'Processando...' : 'Cancelar Reserva'}
                            </SubmitButton>

                            <SubmitButton
                                estilo="secundario"
                                disabled={cobranca.status !== 'pendente' || loadingButton}
                                onClick={() => gerenciarCobranca('expirar')}
                            >   
                                {loadingButton ? 'Processando...' : 'Expirar Cobrança'}
                            </SubmitButton>

                            <SubmitButton
                                estilo="secundario"
                                disabled={cobranca.status !== 'concluido' || loadingButton}
                                onClick={() => gerenciarCobranca('estornar')}
                            >
                                {loadingButton ? 'Processando...' : 'Estornar Dinheiro'}
                            </SubmitButton>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}