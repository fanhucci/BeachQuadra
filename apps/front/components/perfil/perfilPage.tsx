'use client'

import { useState } from "react";
import { useUser } from "@/context/userContext";
import PerfilForm from "./perfilForm";
import PerfilHistorico from "./perfilHistoricoComponentes/perfilHistorico";
import SemAutorizacao from "../erros/semAutorizacao";
import NaoAutenticado from "../erros/naoAutenticado";

export default function PerfilPage({ id_perfil }: { id_perfil: number }) {
    const { user } = useUser();
    const [abaAtiva, setAbaAtiva] = useState<"cadastro" | "historico">("cadastro");

    if (!user) return <NaoAutenticado />;

    const ehDonoDoPerfil = Number(user.id_pessoa) === id_perfil;
    const ehAdminOuFuncionario = user.id_cargo > 1; 

    if (!ehDonoDoPerfil && !ehAdminOuFuncionario) return <SemAutorizacao />;

    return (
        <section className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col flex-1 min-h-0 overflow-hidden transition-all">
            
            <div className="border-b border-gray-200 mb-6 overflow-x-auto scrollbar-none">
                <div className="flex gap-4 sm:gap-8 min-w-max px-1">
                    <button
                        type="button"
                        onClick={() => setAbaAtiva("cadastro")}
                        className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap focus:outline-none ${
                            abaAtiva === "cadastro" 
                                ? "border-blue-600 text-blue-600 font-bold scale-[1.02]" 
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Dados Cadastrais
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setAbaAtiva("historico")}
                        className={`pb-3 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap focus:outline-none ${
                            abaAtiva === "historico" 
                                ? "border-blue-600 text-blue-600 font-bold scale-[1.02]" 
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                    >
                        Histórico de Reservas
                    </button>
                </div>
            </div>

            <div className="w-full flex-1 min-h-0 flex flex-col animation-fadeIn overflow-hidden">
                {abaAtiva === "cadastro" ? (
                    <PerfilForm 
                        id_perfil={id_perfil}
                        isUser={ehDonoDoPerfil} 
                        isAdmin={ehAdminOuFuncionario}
                    />
                ) : (
                    <PerfilHistorico id_usuario={id_perfil} />
                )}
            </div>

        </section>
    );
}