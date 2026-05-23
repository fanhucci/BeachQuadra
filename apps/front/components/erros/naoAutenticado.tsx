'use client'

import { Key } from "lucide-react";
import LinkButton from "../buttonComponents/linkButton";

export default function NaoAutenticado() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center">
            <div className="bg-white shadow rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center gap-5 min-h-[350px]">

                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-2xl font-black select-none">
                    <span><Key/></span>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Sessão Necessária</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Você precisa estar conectado para acessar esta página. Sua sessão pode ter expirado por inatividade.
                    </p>
                </div>

                <div className="pt-2 flex gap-3">
                    <LinkButton
                        href={'/login'}
                        estilo="primario"
                    >
                        <span>Ir para o Login</span>
                    </LinkButton>
                </div>
            </div>
        </div>
    );
}