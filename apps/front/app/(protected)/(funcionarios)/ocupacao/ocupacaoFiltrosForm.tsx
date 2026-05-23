'use client'

import CustomInput from "@/components/inputsComponents/customInput";
import CustomSelect from "@/components/inputsComponents/customSelect";
import { OcupacaoSearch } from "@app/shared";


interface OcupacaoFiltrosProps {
    types: OcupacaoSearch;
    handle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function OcupacaoFiltrosForm({
    types,
    handle
}: OcupacaoFiltrosProps) {

    const opcoesTipo = [
        { value: "", label: "Todas" },
        { value: "individual", label: 'Individual' },
        { value: "duplas", label: 'Duplas' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">
            
            <div className="col-span-1 md:col-span-2">
                <CustomInput 
                    label="Pesquisar Quadra"
                    placeholder="Nome da quadra..."
                    name="search"
                    onChange={handle}
                    value={types.search ?? ""}
                />
            </div>

            <CustomSelect 
                label="Categoria"
                name="tipo"
                options={opcoesTipo}
                value={String(types.tipo ?? "")}
                onChange={(n, v) => handle({ target: { name: n, value: v } } as any)}
            />

            <div className="col-span-1">
                <CustomInput 
                    label="Data Início"
                    type="date"
                    name="data_inicio"
                    onChange={handle}
                    value={types.data_inicio ?? ""}
                />
            </div>

            <div className="col-span-1">
                <CustomInput 
                    label="Data Fim"
                    type="date"
                    name="data_fim"
                    onChange={handle}
                    value={types.data_fim ?? ""}
                />
            </div>

        </div>
    )
}