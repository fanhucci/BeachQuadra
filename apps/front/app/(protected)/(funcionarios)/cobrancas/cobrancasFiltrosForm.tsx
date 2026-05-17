'use client'

import CustomInput from "@/components/inputsComponents/customInput";
import CustomSelect from "@/components/inputsComponents/customSelect";




interface CobrancasFiltrosProps {
    types:any;
    handle:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
export default function CobrancasFiltrosForm({
    types,
    handle
}:CobrancasFiltrosProps){


    const opcoesPagamento = [
        {value:"pendente", label:"pendente"},
        {value:"concluido", label:"concluido"},
        {value:"cancelado", label:"cancelado"},
        {value:"expirado", label:"expirado"},
        {value:"estorno", label:"estorno"},
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
                label="Pagamento"
                name="pagamento"
                options={opcoesPagamento}
                value={types.status}
                onChange={(n, v) => handle({target: {name: n, value: v}} as any)}
            />

            <div>
                
                <input type="date"/>
                <input type="date"/>
                
            </div>
            
        </div>
    )
}