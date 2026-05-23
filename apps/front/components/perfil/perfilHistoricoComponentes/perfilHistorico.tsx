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
import { FileDown } from "lucide-react"; // Importado para manter a mesma iconografia

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
            
            <section className="bg-white p-4 lg:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 flex-shrink-0">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filtrar Histórico</h3>
                    
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleExportarPDF}
                            disabled={saidas.length === 0 || loading}
                            className="inline-flex items-center gap-2 px-3 py-1.5 h-auto text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                        >
                            <FileDown size={14} className="text-red-500" strokeWidth={2.5} />
                            <span>Exportar Relatório</span>       
                        </button>

                        <button
                            type="button"
                            onClick={limparFiltros}
                            className="text-xs font-semibold text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg px-2.5 py-1.5 transition-all"
                        >
                            Resetar Filtros
                        </button>
                    </div>
                </div>
                    
                <PerfilHistoricoFiltrosForm 
                    types={filters}
                    handle={handleFilters}
                    onLimpar={limparFiltros}
                />
            </section>

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