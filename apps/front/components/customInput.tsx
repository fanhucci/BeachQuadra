import { cpfMask, dinheiroMask, telefoneMask } from "@/utils/mascaras";
import React, { useMemo } from "react";

type InputVariant = "text" | "password" | "email" | "number" | "cpf" | "tel" | "money";

type InputProps = {
    label?: React.ReactNode;
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

    const valorFormatado = useMemo(()=>{
        const valorEmString = String(value);

        if (type === "cpf") return cpfMask(valorEmString);
        if (type === "tel") return telefoneMask(valorEmString);
        if (type === "money") return dinheiroMask(valorEmString);
        
        return value;

    },[value,type]);

    return (
        <div className="flex flex-col gap-1 w-full">
           {label &&(
                <label htmlFor={name} className="text-sm font-semibold text-gray-700 px-1 uppercase tracking-wide">
                    {label}
                </label>
           )}

            <input
                id={name}
                placeholder={placeholder}
                name={name}
                type={type === "password" ? "password" : "text"}
                inputMode={type === "cpf" || type === "tel" || type === "number" ? "numeric" : "text"}
                value={valorFormatado}
                onChange={onChange}
                className={`
                    border rounded-lg h-12 px-3 text-base transition-all duration-200
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