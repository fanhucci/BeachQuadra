"use client";
import { useEffect, useState } from "react";

type Option = {
    label: React.ReactNode;
    value: string;
};

type CustomSwitchProps = {
    estadoA: Option;
    estadoB: Option;
    name: string;
    onChange?:(value:string)=>void;
    selected:string;
};

export default function CustomSwitch({
    estadoA,
    estadoB,
    name,
    onChange,
    selected
}: CustomSwitchProps) {
    const [estado, setEstado] = useState(estadoA.value);

    useEffect(()=>{
        setEstado(selected)
    },[selected]);

    function handleChange(value:string){
        setEstado(value);
        onChange?.(value);
    }

    return (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 capitalize">
            {name}
        </label>

        <div className="flex border p-1 rounded-xl w-fit">
            <button
                type="button"
                onClick={() => handleChange(estadoA.value)}
                className={`flex items-center px-4 py-2 h-7 rounded-lg  text-sm font-medium transition-all ${
                    estado === estadoA.value
                    ? "bg-[#00B85C] text-white shadow"
                    : "text-gray-600 hover:text-[#00B85C]"
                }`}
            >
                {estadoA.label}
            </button>

            <button
                type="button"
                onClick={() => handleChange(estadoB.value)}
                className={`flex items-center px-4 py-2 h-7 rounded-lg text-sm font-medium transition-all ${
                    estado === estadoB.value
                    ? "bg-[#00B85C] text-white shadow"
                    : "text-gray-600 hover:text-[#00B85C]"
                }`}
            >
                {estadoB.label}
            </button>
        </div>

        <input type="hidden" name={name} value={estado} />
    </div>
  );
}