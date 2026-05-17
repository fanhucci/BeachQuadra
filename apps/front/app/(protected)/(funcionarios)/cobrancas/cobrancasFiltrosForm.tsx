'use client'

import CustomInput from "@/components/inputsComponents/customInput";
import CustomSelect from "@/components/inputsComponents/customSelect";
import { CobrancaSearch } from "@app/shared";




interface CobrancasFiltrosProps {
    types:CobrancaSearch;
    handle:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function CobrancasFiltrosForm({
    types,
    handle
}:CobrancasFiltrosProps){


    const opcoesPagamento = [
        {value:"", label:"Todos"},
        {value:"pendente", label:"pendente"},
        {value:"concluido", label:"concluido"},
        {value:"cancelado", label:"cancelado"},
        {value:"expirado", label:"expirado"},
        {value:"estornado", label:"estornado"},
    ]



    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-end">

            <div className="col-span-1 md:col-span-3">
                <CustomInput 
                    label="Pesquisar"
                    placeholder="Buscar por nome do cliente..."
                    name="search"
                    onChange={handle}
                    value={types.nome}
                />
            </div>

            <CustomSelect 
                label="Pagamento"
                name="pagamento"
                options={opcoesPagamento}
                value={types.pagamento ?? ''}
                onChange={(n, v) => handle({target: {name: n, value: v}} as any)}
            />

            <div className="col-span-1 flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">De (Data)</label>
                <input 
                    type="date"
                    name="data_inicio"
                    value={types.data_inicio ?? ''}
                    onChange={handle}
                    className="w-full h-10 px-3 rounded-md border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-700"
                />
            </div>

            <div className="col-span-1 flex flex-col gap-1">
                <label className="text-sm font-medium text-zinc-700">Até (Data)</label>
                <input 
                    type="date"
                    name="data_fim" 
                    value={types.data_fim ?? ''}
                    onChange={handle}
                    className="w-full h-10 px-3 rounded-md border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-zinc-700"
                />
            </div>
        </div>
    )
}