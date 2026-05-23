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
import { History, FileDown, ChevronLeft, ChevronRight } from "lucide-react";

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
        trocarPagina, 
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
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar o arquivo PDF.");
        }
    };

    const totalPaginas = Math.ceil(totalItens / limit) || 1;

    return (
        <section className="w-full flex-1 min-h-0 bg-gray-50/50 overflow-hidden flex flex-col rounded-2xl">
            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">

                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm border border-indigo-100">
                            <History size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Histórico do Usuário</h2>
                            <p className="text-xs text-gray-500">Consulte, filtre e exporte o relatório de movimentações e agendamentos</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 self-end sm:self-center">
                        <SubmitButton
                            type="button"
                            estilo="perigo"
                            onClick={handleExportarPDF}
                            disabled={saidas.length === 0 || loading}
                        >
                            <FileDown size={16} />
                            <span>Exportar Relatório</span>       
                        </SubmitButton>
                    </div>
                </header>

                <section className="bg-white p-4 lg:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 flex-shrink-0">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filtrar Histórico</h3>
                        <SubmitButton
                            estilo="fantasma"
                            className="text-xs text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg px-2.5 py-1 h-auto transition-all"
                            onClick={limparFiltros}
                        >
                            Resetar Filtros
                        </SubmitButton>
                    </div>
                        
                    <PerfilHistoricoFiltrosForm 
                        types={filters}
                        handle={handleFilters}
                    />
                </section>

                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0 relative">
                    
                    {loading && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[1px]">
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto min-h-0">
                        <CustomTable 
                            columns={colunas}
                            data={saidas}
                        />

                        {saidas.length === 0 && !loading && (
                            <div className="px-6 py-12 text-center text-gray-400 font-medium">
                                Nenhum registro de agendamento encontrado para os filtros selecionados.
                            </div>
                        )}
                    </div>

                    <div className="bg-gray-50/50 px-6 py-3.5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-500">
                            Mostrando <span className="text-gray-800 font-semibold">{saidas.length}</span> de <span className="text-gray-800 font-semibold">{totalItens}</span> registros encontrados
                        </span>
                        
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-black hover:bg-gray-50 transition-all disabled:opacity-40"
                                disabled={page === 1 || loading}
                                onClick={voltarPagina}
                            >
                                <ChevronLeft stroke="#000000" style={{ display: 'block' }} size={14}/>
                            </button>

                            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 h-8 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700">
                                <span>Página</span>
                                <input
                                    type="number"
                                    value={page}
                                    onChange={(e) => {
                                        let valor = Number(e.target.value) ?? 1;
                                        if(valor > totalPaginas) valor = totalPaginas;
                                        if(valor < 1) valor = 1;
                                        if(trocarPagina) trocarPagina(valor);
                                    }}
                                    min={1}
                                    max={totalPaginas}
                                    className="w-8 text-center font-bold text-indigo-600 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="text-gray-400 font-normal">de {totalPaginas}</span>
                            </div>

                            <button
                                type="button"
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-black hover:bg-gray-50 transition-all disabled:opacity-40"
                                disabled={page === totalPaginas || loading}
                                onClick={proximaPagina}
                            >
                                <ChevronRight stroke="#000000" style={{ display: 'block' }} size={14}/>
                            </button>
                        </div>
                    </div>

                </section>
            </div>
        </section>
    );
}