'use client'

import { Lock } from "lucide-react";
import LinkButton from "../buttonComponents/linkButton";

export default function SemAutorizacao() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center">
            <div className="bg-white shadow rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center gap-5 min-h-[350px]">

                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-2xl font-black select-none">
                    <span><Lock/></span>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Acesso Negado</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Você não possui o nível de permissão necessário para visualizar esta página. Caso ache que isso é um erro, contate um administrador.
                    </p>
                </div>

                <div className="pt-2">
                    <LinkButton
                        href={'/'}
                        estilo="primario"
                    >
                        <span>Voltar para o Início</span>
                    </LinkButton>
                </div>
            </div>
        </div>
    );
}