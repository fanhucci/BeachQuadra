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
import { History, FileDown, ChevronLeft, ChevronRight, Calendar, Hourglass, DollarSign, Percent, Trophy } from "lucide-react";
import { dinheiroMask } from "@/utils/mascaras";

interface FiltrosHistorico {
    search?: string;
    dataInicio?: string;
    dataFim?: string;
    status?: string;
}

interface ResumoCliente {
    nome_cliente: string;   
    cpf_cliente: string;      
    total_agendamentos: number;
    total_horas: number;
    valor_total_gasto: number;
    taxa_cancelamento: number;
    ultima_reserva: string | null;
    quadra_mais_utilizada: string | null;
}

export default function PerfilHistorico({ id_usuario }: { id_usuario: number }) {
    const [saidas, setSaidas] = useState<ItemHistorico[]>([]);
    const [totalItens, setTotalItens] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [resumo, setResumo] = useState<ResumoCliente>({
        nome_cliente:'',
        cpf_cliente:'',
        total_agendamentos: 0,
        total_horas: 0,
        valor_total_gasto: 0,
        taxa_cancelamento: 0,
        ultima_reserva: null,
        quadra_mais_utilizada: 'Nenhuma'
    });

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
                
                if (dados.resumo) {
                    setResumo(dados.resumo);
                }
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


    const formatarData = (dataString: string | null) => {
        if (!dataString) return "Sem registros";
        return new Date(dataString).toLocaleDateString('pt-BR', {
            timeZone:'utc',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

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

            const infoCliente = {
                nome: resumo.nome_cliente || "Cliente não identificado",
                identificacao: resumo.cpf_cliente || "Não informado"
            };

            gerarPDFHistorico(saidas, textoFiltros, infoCliente);
            
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar o arquivo PDF.");
        }
    };

    const totalPaginas = Math.ceil(totalItens / limit) || 1;

    return (
        <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full transition-all flex flex-col flex-1 min-h-0">
            <div className="w-full h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 overflow-hidden">

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 flex-shrink-0">
                    
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Calendar size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Reservas</span>
                            <span className="text-xl font-bold text-gray-900 mt-0.5">{resumo.total_agendamentos}</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <Hourglass size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Horas em Quadra</span>
                            <span className="text-xl font-bold text-gray-900 mt-0.5">{resumo.total_horas}h</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <DollarSign size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Gasto</span>
                            <span className="text-xl font-bold text-emerald-600 mt-0.5">{dinheiroMask(resumo.valor_total_gasto)}</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                            <Percent size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Cancelamentos</span>
                            <span className={`text-xl font-bold mt-0.5 ${resumo.taxa_cancelamento > 20 ? 'text-red-600' : 'text-gray-900'}`}>
                                {resumo.taxa_cancelamento}%
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-center gap-1.5 col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <Trophy size={14} className="text-indigo-500 flex-shrink-0" />
                            <span className="text-[11px] font-bold text-gray-700 truncate max-w-[180px]">
                                {resumo.quadra_mais_utilizada || 'Nenhuma'}
                            </span>
                        </div>
                        <div className="border-t border-gray-100 pt-1.5 flex flex-col">
                            <span className="text-[10px] font-medium text-gray-400 uppercase">Última Atividade</span>
                            <span className="text-xs text-gray-600 font-semibold mt-0.5">
                                {formatarData(resumo.ultima_reserva)}
                            </span>
                        </div>
                    </div>

                </div>

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