'use client'
import { Quadra } from "@app/shared";
import CustomSelect from "../customSelect";
import CustomInput from "../customInput";

const opcoesTipo = [
    { value:"individual", label: 'Indivídual' },
    { value:"duplas", label: 'Duplas' },
    
];

const opcoesStatus = [
    {value:"true", label:"Ativa"},
    {value:"false", label:"Inativa"},
];

const opcoesAtivo = [
    {value:"", label:"Ambos"},
    {value:"true", label:"Ativa"},
    {value:"false", label:"Inativa"},
];

interface QuadraModalFormProps{
    formData:Partial<Quadra>;
    erros:Partial<Record<keyof Quadra, string>>;
    handleChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>void;
}

export default function QuadraModalForm({
    formData,
    erros,
    handleChange,
}:QuadraModalFormProps){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2">
            
                <CustomSelect
                    label="Categoria"
                    name="tipo"
                    options={opcoesTipo}
                    value={formData.tipo || ""}
                    erro={erros.tipo}
                    onChange={(name, val) => {
                        handleChange({
                            target: { name, value: val }
                        } as any);
                    }}
                />

                <CustomSelect
                    label="Status"
                    name="status"
                    options={opcoesStatus}
                    value={String(formData.status)}
                    erro={erros.status}
                    onChange={(name, val) => {
                        handleChange({
                            target: { name, value: val }
                        } as any);
                    }}
                />
       

            
                <CustomInput
                    label="Nome"
                    name="nome"
                    onChange={handleChange}
                    value={formData.nome}
                    erro={erros.nome}
                    type="text"
                />
           

            <CustomInput
                label="valor"
                name="valor"
                onChange={handleChange}
                value={formData.valor}
                erro={erros.valor}
                type="money"
            />
            
        </div >
    );
}