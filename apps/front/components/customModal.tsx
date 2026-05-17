import React from "react";
import LinkButton from "./buttonComponents/linkButton";
import SubmitButton from "./buttonComponents/submitButton";

type BotaoModal = {
    label: string;
    onClick?: () => void;
    href?: string;
    estilo?: 'primario' | 'secundario' | 'fantasma' | 'perigo';
    isLoading?: boolean;
    disabled?:boolean;
}

type ModalTypes = {
    children: React.ReactNode;
    heigth?:string;
    width?:string;
    titulo: string;
    estado: boolean;
    fechar: () => void;
    botoes?: BotaoModal[];
}

export default function CustomModal({
    children,
    heigth = '200',
    width = '200',
    titulo,
    botoes = [],
    estado,
    fechar,
}: ModalTypes) {

    if (!estado) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
            
            <div className={`bg-white rounded-xl shadow-2xl w-fit overflow-hidden animate-in fade-in zoom-in duration-200`}>
                
       
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800">{titulo}</h2>
                    <button 
                        onClick={fechar} 
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-colors"
                    >
                        &times;
                    </button>
                </div>

 
                <div className={`w-${width} h-${heigth} p-6 text-gray-600`}>
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
                                <SubmitButton key={index} onClick={btn.onClick} estilo={btn.estilo} isLoading={btn.isLoading} disabled={btn.disabled}>
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