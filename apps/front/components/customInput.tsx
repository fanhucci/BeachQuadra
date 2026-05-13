import { cpfMask, dinheiroMask, telefoneMask } from "@/utils/mascaras";
import React from "react";

type InputVariant = "text" | "password" | "email" | "number" | "cpf" | "tel" | "money";

type InputProps = {
    label: string;
    placeholder?: string;
    name: string;
    value?: string | number;
    erro?: string;
    type?: InputVariant;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInput({
    label,
    placeholder,
    name,
    type = "text",
    value = type === 'number' || type === 'money'? '0':"",
    erro,
    onChange,
}: InputProps) {

    const masks:Record<string,(val:string)=>string> = {
        cpf:(val:string)=>cpfMask(val),
        tel:(val:string)=>telefoneMask(val),
        money: (val:string)=>(dinheiroMask(val))
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        
        const maskFn = masks[type];

        if(maskFn){
            e.target.value = maskFn(e.target.value);
        }

        onChange(e);
    }

    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={name} className="text-[12px] font-medium text-gray-500 uppercase tracking-wide px-1">
                {label}
            </label>

            <input
                id={name}
                placeholder={placeholder}
                name={name}

                type={type === "password" ? "password" : "text"}
                inputMode={type === "cpf" || type === "tel" || type === "number" ? "numeric" : "text"}
                value={value}
                onChange={handleChange}
                className={`
                    border rounded-lg h-10 px-3 text-sm transition-all duration-200
                    focus:outline-none focus:ring-2
                    ${erro 
                        ? "border-red-400 focus:ring-red-100 bg-red-50/10" 
                        : "border-gray-200 focus:border-blue-400 focus:ring-blue-50 bg-white"}
                placeholder:text-gray-300
                `}
            />

            {erro && (
                <p className="text-[11px] text-red-500 font-medium px-1">
                    {erro}
                </p>
            )}
        </div>
    );
}