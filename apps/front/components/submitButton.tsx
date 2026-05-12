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
        'perigo': "bg-red-100 text-red-600 hover:bg-red-200"
    }

    const base = "inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

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