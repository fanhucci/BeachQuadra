'use client'

import { X } from "lucide-react";
import SubmitButton from "../buttonComponents/submitButton";

interface ErroPageProps {
    reset?: () => void;
    mensagem?: string;
}

export default function ErroInesperado({ reset, mensagem }: ErroPageProps) {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center">
            <div className="bg-white shadow rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center gap-5 min-h-[350px]">

                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-3xl font-extrabold select-none">
                    <span><X/></span>
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Algo deu errado</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        {mensagem || "Houve uma falha interna no carregamento desta seção. Por favor, tente novamente."}
                    </p>
                </div>

                {reset && (
                    <div className="pt-2">
                        <SubmitButton estilo="perigo" type="button" onClick={() => reset()}>
                            <span>Tentar Novamente</span>
                        </SubmitButton>
                    </div>
                )}
            </div>
        </div>
    );
}