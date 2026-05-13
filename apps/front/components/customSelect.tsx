'use client'

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
    value: string | number;
    label: string;
};

type SelectProps = {
    label?: string;
    name: string;
    value: string | number;
    options: Option[];
    erro?: string;
    onChange: (name: string, value: string | number) => void;
};

export default function CustomSelect({ label, name, value, options, erro, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => String(opt.value) === String(value));

    return (
        <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
            {label &&(
                <label className="text-sm font-semibold text-gray-700 px-1 uppercase tracking-wide">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center justify-between
                    border rounded-xl h-12 px-4 text-base transition-all bg-white
                    ${erro ? "border-red-400 ring-red-50" : "border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"}
                `}
            >
                <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
                    {selectedOption ? selectedOption.label : "Selecione..."}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <ul className="absolute top-[75px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-150">
                    {options.map((opt) => (
                        <li
                            key={opt.value}
                            onClick={() => {
                                onChange(name, opt.value);
                                setIsOpen(false);
                            }}
                            className={`
                                px-4 py-3 text-base cursor-pointer transition-colors
                                ${opt.value === value ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-50"}
                            `}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}

            {erro && <p className="text-[11px] text-red-500 font-medium px-1">{erro}</p>}
        </div>
    );
}