'use client'

import { AgendamentoSearch } from "@app/shared";
import CustomInput from "../inputsComponents/customInput";
import CustomSelect from "../inputsComponents/customSelect";

interface AgendamentosFiltrosProps {
    types:AgendamentoSearch;
    handle:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function AgendamentosFiltrosForm({
    types,
    handle
}:AgendamentosFiltrosProps){

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

        </div>
    )
}