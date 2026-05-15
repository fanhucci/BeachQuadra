"use client";

import { useEffect, useState } from "react";

type Option = {
    label: React.ReactNode;
    value: any;
};

type CustomSwitchProps = {
    estadoA: Option;
    estadoB: Option;
    name: string;
    label?: string; 
    onChange?: (value: any) => void;
    selected: any;
};

export default function CustomSwitch({
    estadoA,
    estadoB,
    name,
    label,
    onChange,
    selected
}: CustomSwitchProps) {
    const [estado, setEstado] = useState(selected || estadoA.value);

    useEffect(() => {
        setEstado(selected);
    }, [selected]);

    function handleChange(value: any) {
        setEstado(value);
        onChange?.(value);
    }

    return (
        <div className="flex flex-col gap-1.5 w-full">

            {(label || name) && (
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                    {label || name}
                </label>
            )}


            <div className="relative flex p-1 bg-gray-100/50 border border-gray-200 rounded-xl w-full max-w-fit min-w-[200px] h-10 items-center">
                

                <button
                    type="button"
                    onClick={() => handleChange(estadoA.value)}
                    className={`relative z-10 flex-1 flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        estado === estadoA.value
                            ? "text-white"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {estadoA.label}
                </button>


                <button
                    type="button"
                    onClick={() => handleChange(estadoB.value)}
                    className={`relative z-10 flex-1 flex items-center justify-center px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        estado === estadoB.value
                            ? "text-white"
                            : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                    {estadoB.label}
                </button>

                <div
                    className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-blue-600 rounded-lg shadow-sm transition-transform duration-300 ease-in-out ${
                        estado === estadoB.value ? "translate-x-full" : "translate-x-0"
                    }`}
                />
            </div>

            <input type="hidden" name={name} value={estado} />
        </div>
    );
}