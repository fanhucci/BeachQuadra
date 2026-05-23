'use client'

import { useState, useEffect } from "react";
import useFilter from "@/hooksGenericos/useFilter";
import { apiRequest } from "@/utils/apiHandler";
import CustomTable from "@/components/customTable";
import { toast } from "sonner";
import PerfilHistoricoFiltrosForm from "./perfilHistoricoFiltrosForm";
import SubmitButton from "@/components/buttonComponents/submitButton";
import usePerfilHistoricoTable, { ItemHistorico } from "./usePerfilHistoricoTable";
import { gerarPDFHistorico } from "@/utils/pdfHandler";

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
                const dados = await apiRequest(`/usuarios/${id_usuario}/historico${queryString}`);
                
                setSaidas(dados.saidas || []);
                setTotalItens(dados.total || 0);
            } catch (error) {
                console.error(error);
                toast.error("Não foi possível carregar o histórico de agendamentos.");
            } finally {
                setLoading(false);
            }
        }

        if (id_usuario) {
            carregarHistorico();
        }
    }, [queryString, id_usuario]);

    const obterFiltrosTexto = () => {
        const partes: string[] = [];
        if (filters.search) partes.push(`Código: ${filters.search}`);
        if (filters.status) partes.push(`Status: ${filters.status}`);
        if (filters.dataInicio) partes.push(`Início: ${new Date(filters.dataInicio).toLocaleDateString('pt-BR')}`);
        if (filters.dataFim) partes.push(`Fim: ${new Date(filters.dataFim).toLocaleDateString('pt-BR')}`);
        
        return partes.length > 0 ? partes.join(" | ") : "Nenhum";
    };

    const handleExportarPDF = () => {
        if (saidas.length === 0) {
            toast.warning("Não há registros exibidos para gerar o relatório.");
            return;
        }

        try {
            const textoFiltros = obterFiltrosTexto();
            gerarPDFHistorico(saidas, textoFiltros);
            toast.success("PDF gerado com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar o arquivo PDF.");
        }
    };

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

            <div className="flex justify-end pr-1">
                <button
                    type="button"
                    onClick={handleExportarPDF}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
                >
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Exportar PDF
                </button>
            </div>

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
                        Nenhum registro de agendamento encontrado para os filtros selecionados.
                    </div>
                )}

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