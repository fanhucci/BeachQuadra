'use client'

import { QuadraSearch } from "@app/shared";
import CustomInput from "../InputsComponents/customInput";
import CustomSelect from "../InputsComponents/customSelect";

interface QuadrasFiltrosProps {
    types:QuadraSearch;
    handle:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function QuadrasFiltrosForm({
    types,
    handle
}:QuadrasFiltrosProps){

    const opcoesTipo = [
        {value:"", label:"Todas"},
        { value:"individual", label: 'Indivídual' },
        { value:"duplas", label: 'Duplas' },
        
    ];

    const opcoesStatus = [
        {value:"", label:"Ambos"},
        {value:"true", label:"Ativa"},
        {value:"false", label:"Inativa"},
    ];

    const opcoesAtivo = [
        {value:"", label:"Ambos"},
        {value:"true", label:"Ativa"},
        {value:"false", label:"Inativa"},
    ];

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">

            <div className="col-span-1 md:col-span-3">
                <CustomInput 
                    label="Pesquisar"
                    placeholder="Pesquisa..."
                    name="search"
                    onChange={handle}
                    value={types.search}
                />
            </div>

            <CustomSelect 
                label="Categoria"
                name="tipo"
                options={opcoesTipo}
                value={String(types.tipo)}
                onChange={(n, v) => handle({target: {name: n, value: v}} as any)}
            />

            <CustomSelect 
                label="Cargo"
                name="status"
                options={opcoesStatus}
                value={String(types.status)}
                onChange={(n, v) => handle({target: {name: n, value: v}} as any)}
            />

            <CustomSelect 
                label="Conta"
                name="ativo"
                options={opcoesAtivo}
                value={String(types.ativo)}
                onChange={(n, v) => handle({target: {name: n, value: v}} as any)}
            />
        </div>
    )
}