'use client'

import CustomInput from "@/components/inputsComponents/customInput";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { Usuario } from "@app/shared"; 
import { toast } from "sonner";
import { cpfMask } from "@/utils/mascaras";

interface BuscarClienteProps {
    cliente?:Usuario | null;
    onSelecionar: (cliente: Usuario) => void;
}

export default function BuscarCliente({ cliente = null, onSelecionar }: BuscarClienteProps){
    
    const [busca, setBusca] = useState<string>('');
    const [resultados, setResultados] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {

        if (busca.length < 3) {
            setResultados([]);
            return;
        }

        const delay = setTimeout(async () => {
            setLoading(true);
            try {
                const dados = await apiRequest(`/usuarios/clientes?search=${busca}`);
                setResultados(dados);
            } catch (error) {
                toast.error(error instanceof Error? error.message : 'Erro ao buscar clientes.');
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [busca]);

    return (
        <div className="flex flex-col gap-2 relative">
            <CustomInput
                name="busca"
                value={cliente?.nome ?? busca}
                onChange={(e) => setBusca(e.target.value)}
                label="Cliente"
                placeholder="Nome ou CPF"
            />

            {resultados.length > 0 && (
                <div className="absolute top-[70px] w-full z-50 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                    {resultados.map((r) => (
                        <button
                            key={r.id_pessoa}
                            type="button"
                            onClick={() => {
                                onSelecionar(r);
                                setBusca(r.nome); 
                                setResultados([]);
                            }}
                            className="w-full flex flex-col items-start p-3 hover:bg-[#00B85C]/5 transition-colors border-b last:border-none border-gray-100"
                        >
                            <span className="font-bold text-gray-800 text-sm">{r.nome}</span>
                            <div className="flex gap-2 text-[11px] text-gray-500">
                                {r.cpf && <span>{cpfMask(r.cpf)}</span>}
                                {r.email && <span>• {r.email}</span>}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {busca.length >= 3 && resultados.length === 0 && !loading && (
                <p className="text-xs text-gray-400 mt-1 ml-1 italic">
                    Nenhum cliente encontrado.
                </p>
            )}
        </div>
    )
}