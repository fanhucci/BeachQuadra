'use client'

import { useState } from "react";
import { useUser } from "@/context/userContext";
import PerfilForm from "./perfilForm";
import PerfilHistorico from "./perfilHistorico";

export default function PerfilPage({id_perfil}:{id_perfil:number}) {
    const { user } = useUser();
    const [abaAtiva, setAbaAtiva] = useState<"cadastro" | "historico">("cadastro");

    if (!user) {
        return <div className="p-6 text-center text-red-500">Usuário não autenticado.</div>;
    }

    const ehDonoDoPerfil = user.id_pessoa === id_perfil;
    const ehAdminOuFuncionario = user.id_cargo > 1; 

    if (!ehDonoDoPerfil && !ehAdminOuFuncionario) {
        return <div className="p-6 text-center text-gray-500 font-medium">Sem permissão para acessar este perfil.</div>;
    }

    return (
        <section className="max-w-4xl mx-auto p-6">
            
            <div className="flex border-b border-gray-200 mb-6 gap-6">
                <button
                    onClick={() => setAbaAtiva("cadastro")}
                    className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                        abaAtiva === "cadastro" 
                            ? "border-blue-500 text-blue-600 font-semibold" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Dados Cadastrais
                </button>
                <button
                    onClick={() => setAbaAtiva("historico")}
                    className={`pb-3 text-sm font-medium border-b-2 transition-all ${
                        abaAtiva === "historico" 
                            ? "border-blue-500 text-blue-600 font-semibold" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                    Histórico de Reservas
                </button>
            </div>

            {/* <div className="mt-4">
                {abaAtiva === "cadastro" ? (
                    <PerfilForm 
                        id_perfil={id_perfil}
                        isUser={ehDonoDoPerfil} 
                        isAdmin={ehAdminOuFuncionario}
                    />
                ) : (
                    <PerfilHistorico id_usuario={id_perfil} />
                )}
            </div> */}

        </section>
    );
}