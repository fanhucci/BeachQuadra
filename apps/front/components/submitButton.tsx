import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SubmitButtomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    estilo?:'primario'| 'secundario'| 'perigo';
    isLoading?:boolean;
}

export default function SubmitButtom({
    children,
    estilo = 'secundario',
    className,
    isLoading = false,
    ...props
}:SubmitButtomProps){
    const variantes = {
        'primario': "bg-blue-500 text-white hover:bg-blue-600 shadow-sd",
        'secundario': "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
        'fantasma':"bg-gray-50 text-blue-500 hover:bg-gray-100 shadow-sd",
        'perigo': "bg-red-100 text-red-600 hover:bg-red-200"
    }

    const base = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

    return(
        <button
            {...props}
            disabled={isLoading}
            className={`
                ${base}
                ${variantes[estilo]}
                ${className}`}
        >
            {
                isLoading
                ? <LoadingSpinner/>
                :children
            }
        </button>
    )
}