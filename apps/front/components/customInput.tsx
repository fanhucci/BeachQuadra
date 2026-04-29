import React from "react";

type InputProps = {
  label: string;
  name: string;
  value: string | number;
  erro?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CustomInput({
    label,
    name,
    value,
    erro,
    type = "text",
    onChange,
}: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-sm text-gray-600">
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`
                border rounded-lg h-11 px-3 text-sm
                focus:outline-none focus:ring-2 transition
                ${erro
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"}
                `}
            />

            {erro && (
                <p className="text-xs text-red-500">
                {erro}
                </p>
            )}
        </div>
    );
}