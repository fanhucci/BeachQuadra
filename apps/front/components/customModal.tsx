import React from "react";
import LinkButton from "./buttonComponents/linkButton";
import SubmitButton from "./buttonComponents/submitButton";

type BotaoModal = {
    label: string;
    onClick?: () => void;
    href?: string;
    estilo?: 'primario' | 'secundario' | 'fantasma' | 'perigo';
    isLoading?: boolean;
    disabled?: boolean;
}

type ModalTypes = {
    children: React.ReactNode;
    classNameContent?: string; 
    width?: string;            
    titulo: string;
    estado: boolean;
    fechar: () => void;
    botoes?: BotaoModal[];
}

export default function CustomModal({
    children,
    classNameContent = '',
    width = 'max-w-md w-full',
    titulo,
    botoes = [],
    estado,
    fechar,
}: ModalTypes) {

    if (!estado) return null;

    return (

        <div 
            onClick={fechar}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
        >
            
            <div 
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col ${width}`}
            >
                
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base sm:text-lg font-bold text-gray-800">{titulo}</h2>
                    <button 
                        onClick={fechar} 
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 px-2 py-0.5 rounded-lg transition-colors text-2xl font-light"
                    >
                        &times;
                    </button>
                </div>

                <div className={`p-6 text-gray-600 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar ${classNameContent}`}>
                    {children}
                </div>

                {botoes.length > 0 && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
                        {botoes.map((btn, index) => (
                            btn.href ? (
                                <LinkButton key={index} href={btn.href} estilo={btn.estilo}>
                                    {btn.label}
                                </LinkButton>
                            ) : (
                                <SubmitButton 
                                    key={index} 
                                    onClick={btn.onClick} 
                                    estilo={btn.estilo} 
                                    isLoading={btn.isLoading} 
                                    disabled={btn.disabled}
                                >
                                    {btn.label}
                                </SubmitButton>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}