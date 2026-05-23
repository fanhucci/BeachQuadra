'use client'

import { useState, useEffect } from "react";
import useFilter from "@/hooksGenericos/useFilter";
import { apiRequest } from "@/utils/apiHandler";
import CustomTable from "@/components/customTable";

import { toast } from "sonner";
import usePerfilHistoricoTable, { ItemHistorico } from "./useperfilHistoricoTable";
import PerfilHistoricoFiltrosForm from "./perfilHistoricoFiltrosForm";
import SubmitButton from "@/components/buttonComponents/submitButton";


interface FiltrosHistorico {
    search?: string;
    dataInicio?: string;
    dataFim?: string;
    status?: string;
}

export default function PerfilHistorico({ id_usuario }: { id_usuario: number }) {
    const [saidas, setSaidas] = useState<ItemHistorico[]>([]);
    const [totalItens, setTotalItens] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const { 
        queryString,      
        filters,          
        handleFilters,    
        limparFiltros, 
        proximaPagina, 
        voltarPagina,
        page,
        limit 
    } = useFilter<FiltrosHistorico>({
        page: 1,
        limit: 10,
        search: '',
        dataInicio: '',
        dataFim: '',
        status: ''
    }, 400);

    const { colunas } = usePerfilHistoricoTable();

    useEffect(() => {
        async function carregarHistorico() {
            try {
                setLoading(true);
                const dados = await apiRequest(`/usuarios/${id_usuario}/saidas${queryString}`);
                
                setSaidas(dados.saidas || []);
                setTotalItens(dados.total || 0);
            } catch (error) {
                console.error(error);
                toast.error("Não foi possível carregar o histórico de saídas.");
            } finally {
                setLoading(false);
            }
        }

        if (id_usuario) {
            carregarHistorico();
        }
    }, [queryString, id_usuario]);

    const totalPaginas = Math.ceil(totalItens / limit) || 1;
    const itemInicial = (page - 1) * limit + 1;
    const itemFinal = Math.min(page * limit, totalItens);

    return (
        <section className="w-full space-y-6">

            <PerfilHistoricoFiltrosForm 
                types={filters}
                handle={handleFilters}
                onLimpar={limparFiltros}
            />

            {/* Listagem */}
            <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden relative">
                
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                )}

                <CustomTable 
                    columns={colunas}
                    data={saidas}
                />

                {saidas.length === 0 && !loading && (
                    <div className="px-6 py-12 text-center text-gray-400 font-medium">
                        Nenhum registro de saída encontrado para os filtros selecionados.
                    </div>
                )}

                {/* Paginação */}
                {saidas.length > 0 && (
                    <div className="bg-white border-t border-gray-100 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs sm:text-sm text-gray-500">
                            Exibindo <span className="font-semibold text-gray-700">{itemInicial}</span> até <span className="font-semibold text-gray-700">{itemFinal}</span> de <span className="font-semibold text-gray-700">{totalItens}</span> registros
                        </div>
                        
                        <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                            <div className="w-24">
                                <SubmitButton 
                                    estilo="secundario" 
                                    type="button" 
                                    onClick={voltarPagina} 
                                    disabled={page === 1 || loading}
                                >
                                    Anterior
                                </SubmitButton>
                            </div>
                            
                            <span className="text-xs sm:text-sm font-medium text-gray-600 px-2 whitespace-nowrap">
                                Página {page} de {totalPaginas}
                            </span>
                            
                            <div className="w-24">
                                <SubmitButton 
                                    estilo="secundario" 
                                    type="button" 
                                    onClick={proximaPagina} 
                                    disabled={page === totalPaginas || loading}
                                >
                                    Próxima
                                </SubmitButton>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}