'use client'

import { UsuarioSearch } from "@app/shared";
import CustomInput from "../inputsComponents/customInput";
import CustomSelect from "../inputsComponents/customSelect";

interface UsuariosFiltrosProps {
    types:UsuarioSearch;
    handle:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function UsuariosFiltrosForm({
    types,
    handle
}:UsuariosFiltrosProps){

    const opcoesTipo = [
        {value:"nome", label:"Nome"},
        {value:"cpf", label:"CPF"},
        {value:"email", label:"E-mail"},
    ]

    const opcoesCargo = [
        {value:"", label:"Todos"},
        { value:"1", label: 'Cliente' },
        { value:"2", label: 'Funcionário' },
        { value:"3", label: 'Administrador' }
    ];

    const opcoesAtivo = [
        {value:"", label:"Ambos"},
        {value:"true", label:"Ativa"},
        {value:"false", label:"Inativa"},
    ]

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
                value={types.tipo}
                onChange={(n, v) => handle({target: {name: n, value: v}} as any)}
            />

            <CustomSelect 
                label="Cargo"
                name="id_cargo"
                options={opcoesCargo}
                value={String(types.id_cargo)}
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