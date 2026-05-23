'use client'

import LinkButton from "../buttonComponents/linkButton";

export default function NaoEncontrado() {
    return (
        <div className="max-w-3xl mx-auto p-6 text-center">
            <div className="bg-white shadow rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center gap-5 min-h-[350px]">
                
                <div className="w-16 h-16 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-3xl font-bold select-none">
                    ?
                </div>
                
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">Página não encontrada</h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        O endereço que você tentou acessar não existe, foi removido ou mudou de lugar.
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