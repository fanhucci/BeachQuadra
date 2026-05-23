'use client'

import CustomInput from "@/components/inputsComponents/customInput";
import CustomSelect from "@/components/inputsComponents/customSelect";


interface FiltrosHistorico {
    search?: string;
    dataInicio?: string;
    dataFim?: string;
    status?: string;
}

interface HistoricoFiltrosProps {
    types: FiltrosHistorico;
    handle: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onLimpar: () => void;
}

export default function PerfilHistoricoFiltrosForm({ types, handle, onLimpar }: HistoricoFiltrosProps) {
    const opcoesStatus = [
        { value: "", label: "Todos" },
        { value: "FINALIZADO", label: "Finalizado" },
        { value: "PENDENTE", label: "Pendente" },
        { value: "CANCELADO", label: "Cancelado" },
    ];

    const temFiltroAtivo = types.search || types.dataInicio || types.dataFim || types.status;

    return (
        <div className="bg-white shadow-md rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
                    Filtrar Histórico
                </h4>
                {temFiltroAtivo && (
                    <button 
                        type="button" 
                        onClick={onLimpar}
                        className="text-xs font-semibold text-red-600 hover:text-red-800 transition-colors"
                    >
                        Limpar Filtros ×
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">
                <div className="col-span-1 md:col-span-2">
                    <CustomInput 
                        label="Pesquisar Código"
                        placeholder="Ex: #1234..."
                        name="search"
                        onChange={handle}
                        value={types.search || ''}
                    />
                </div>

                <div className="col-span-1 md:col-span-1">
                    <CustomSelect 
                        label="Status"
                        name="status"
                        options={opcoesStatus}
                        value={String(types.status || '')}
                        onChange={(n, v) => handle({ target: { name: n, value: v } } as any)}
                    />
                </div>

                <div className="col-span-1 md:col-span-1.5">
                    <CustomInput 
                        label="Data Inicial"
                        type="date"
                        name="dataInicio"
                        onChange={handle}
                        value={types.dataInicio || ''}
                    />
                </div>

                <div className="col-span-1 md:col-span-1.5">
                    <CustomInput 
                        label="Data Final"
                        type="date"
                        name="dataFim"
                        onChange={handle}
                        value={types.dataFim || ''}
                    />
                </div>
            </div>
        </div>
    );
}