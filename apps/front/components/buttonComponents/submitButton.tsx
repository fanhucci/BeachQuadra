import React from "react";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    estilo?:'primario'| 'secundario'| 'fantasma' | 'perigo' | 'pilula';
    isLoading?:boolean;
}

export default function SubmitButton({
    children,
    estilo = 'secundario',
    className = '',
    isLoading = false,
    ...props
}:SubmitButtonProps){
    const variantes = {
        'primario': "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
        'secundario': "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50",
        'fantasma': "bg-gray-50 text-blue-600 hover:bg-gray-100",
        'perigo': "bg-red-100 text-red-600 hover:bg-red-200",
        'pilula': "rounded-full px-3 py-0.5 text-[11px] h-fit min-h-0 border bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
    }

    const base = "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
    
    return(
        <button
            disabled={isLoading}
            className={`
                ${base}
                ${variantes[estilo]}
                ${className || ''}
            `}
            {...props}
        >
            {
                isLoading
                ? <Loader2 className="animate-spin" size={18} />
                :children
            }
        </button>
    )
}