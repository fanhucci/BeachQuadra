import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    estilo?:'primario'| 'secundario'| 'fantasma' | 'perigo';
    isLoading?:boolean;
}

export default function SubmitButton({
    children,
    estilo = 'secundario',
    className,
    isLoading = false,
    ...props
}:SubmitButtonProps){
    const variantes = {
        'primario': "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        'secundario': "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
        'fantasma': "bg-gray-50 text-blue-600 hover:bg-gray-100",
        'perigo': "bg-red-100 text-red-600 hover:bg-red-200"
    }

    const base = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    
    return(
        <button
            disabled={isLoading}
            className={`
                ${base}
                ${variantes[estilo]}
                ${className} || ''
            `}
            {...props}
        >
            {
                isLoading
                ? <LoadingSpinner/>
                :children
            }
        </button>
    )
}