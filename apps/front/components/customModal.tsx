import React from "react";
import LinkButton from "./linkButton";
import SubmitButton from "./submitButton";

type BotaoModal = {
    label: string;
    onClick?: () => void;
    href?: string;
    estilo?: 'primario' | 'secundario' | 'fantasma' | 'perigo';
    isLoading?: boolean;
}

type ModalTypes = {
    children: React.ReactNode;
    size?:'md'|'lg' |'2xl';
    titulo: string;
    estado: boolean;
    fechar: () => void;
    botoes?: BotaoModal[];
}

export default function CustomModal({
    children,
    size = 'md',
    titulo,
    botoes = [],
    estado,
    fechar,
}: ModalTypes) {

    if (!estado) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            
            <div className={`bg-white rounded-xl shadow-2xl w-full max-w-${size} overflow-hidden animate-in fade-in zoom-in duration-200`}>
                
       
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
                    <button 
                        onClick={fechar} 
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                    >
                        &times;
                    </button>
                </div>

 
                <div className="p-6 text-gray-600">
                    {children}
                </div>


                {botoes.length > 0 && (
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
                        {botoes.map((btn, index) => (
                            btn.href ? (
                                <LinkButton key={index} href={btn.href} estilo={btn.estilo}>
                                    {btn.label}
                                </LinkButton>
                            ) : (
                                <SubmitButton key={index} onClick={btn.onClick} estilo={btn.estilo} isLoading={btn.isLoading}>
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