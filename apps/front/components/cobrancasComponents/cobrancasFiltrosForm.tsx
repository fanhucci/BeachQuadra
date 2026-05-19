'use client'

import React from "react";
import CustomInput from "@/components/inputsComponents/customInput";
import CustomSelect from "@/components/inputsComponents/customSelect";
import { CobrancaSearch } from "@app/shared";

interface CobrancasFiltrosProps {
    types: CobrancaSearch;
    handle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CobrancasFiltrosForm({
    types,
    handle
}: CobrancasFiltrosProps) {

    const opcoesPagamento = [
        { value: "", label: "Todos" },
        { value: "pendente", label: "Pendente" },
        { value: "concluido", label: "Concluído" },
        { value: "cancelado", label: "Cancelado" },
        { value: "expirado", label: "Expirado" },
        { value: "estornado", label: "Estornado" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end w-full">

            <div className="col-span-1 sm:col-span-2 lg:col-span-5">
                <CustomInput 
                    label="Pesquisar"
                    placeholder="Buscar por nome do cliente..."
                    name="nome"
                    onChange={handle}
                    value={types.nome}
                />
            </div>

            <div className="col-span-1 lg:col-span-3">
                <CustomSelect 
                    label="Pagamento"
                    name="pagamento"
                    options={opcoesPagamento}
                    value={types.pagamento ?? ''}
                    onChange={(n, v) => handle({ target: { name: n, value: v } } as any)}
                />
            </div>


            <div className="col-span-1 lg:col-span-2">
                <CustomInput
                    type="date"
                    name="data_inicio"
                    label="De"
                    value={types.data_inicio}
                    onChange={handle}
                />
            </div>

            <div className="col-span-1 lg:col-span-2">
                <CustomInput
                    type="date"
                    name="data_fim"
                    label="Até"
                    value={types.data_fim}
                    onChange={handle}
                />
            </div>

        </div>
    );
}