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

export default function PerfilHistoricoFiltrosForm({ types, handle }: Omit<HistoricoFiltrosProps, 'onLimpar'>) {
    const opcoesStatus = [
        { value: "", label: "Todos" },
        { value: "concluido", label: "Concluído" },
        { value: "pendente", label: "Pendente" },
        { value: "cancelado", label: "Cancelado" },
    ];

    return (
        /* Removido o container de card, bordas e padding fixo para herdar a estrutura da página pai */
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

            <div className="col-span-1 md:col-span-1.5 lg:col-span-1.5 md:col-span-1">
                <CustomInput 
                    label="Data Inicial"
                    type="date"
                    name="dataInicio"
                    onChange={handle}
                    value={types.dataInicio || ''}
                />
            </div>

            <div className="col-span-1 md:col-span-1">
                <CustomInput 
                    label="Data Final"
                    type="date"
                    name="dataFim"
                    onChange={handle}
                    value={types.dataFim || ''}
                />
            </div>
        </div>
    );
}