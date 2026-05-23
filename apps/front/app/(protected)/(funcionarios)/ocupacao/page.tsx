'use client'

import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { OcupacaoSearch, Ocupacao } from "@app/shared"; 
import SubmitButton from "@/components/buttonComponents/submitButton";
import { ChevronLeft, ChevronRight, BarChart3, FileDown } from "lucide-react";

import OcupacaoFiltrosForm from "./ocupacaoFiltrosForm";

import { apiRequest } from "@/utils/apiHandler";
import useOcupacaoTable from "./useOcupacaoTable";
import { gerarPDFOcupacao } from "@/utils/pdfHandler";


export default function OcupacaoPage() {
    
    const { queryString, filters, page, limit, handleFilters, limparFiltros, proximaPagina, voltarPagina, trocarPagina } = useFilter<OcupacaoSearch>({

        page: 1,
        limit: 10
    });

    const {
        loading,
        dados,
    } = usePageCrud<Ocupacao>({
        idKey: 'id_quadra',
        endpoint: 'relatorios/ocupacao', 
        filtro: queryString,
        criarSchema: {} as any, 
        editarSchema: {} as any
    });

    const { colunas } = useOcupacaoTable();

    const totalGeral = dados[0]?.total_geral ?? 0;
    const naoTemProximaPagina = (page * limit) >= totalGeral;


    const handleExportarPDF = async () => { 
        const partesFiltro = [];
        if (filters.data_inicio) partesFiltro.push(`De: "${filters.data_inicio}"`);
        if (filters.data_fim) partesFiltro.push(`Até: "${filters.data_fim}"`);

        const textoFiltros = partesFiltro.length > 0 
            ? partesFiltro.join(" | ") 
            : "Nenhum (Todo o histórico filtrado)";

        try {
            const filtroIlimitado = queryString.replace('limit=10', `limit=${totalGeral}`);
            const resultado = await apiRequest(`/relatorios/ocupacao?${filtroIlimitado}`);
            const listaFinal = Array.isArray(resultado) ? resultado : (resultado?.dados || []);

            gerarPDFOcupacao(listaFinal, textoFiltros);
        } catch (error) {
            console.error("Erro ao buscar dados para o PDF de ocupação:", error);
            gerarPDFOcupacao(dados, `${textoFiltros} (Parcial - Erro ao buscar todos)`);
        }
    };

    const totaisTela = dados.reduce(
        (acc, item) => {
            const reservasNum = Number(item.total_reservas) || 0;
            const cancelamentosNum = Number(item.total_cancelamentos) || 0;

            acc.totalHoras += reservasNum;
            acc.totalCancelamentos += cancelamentosNum;

            if (reservasNum > acc.maiorVolume) {
                acc.maiorVolume = reservasNum;
                acc.quadraMaisPopular = item.nome;
            }

            return acc;
        },
        { totalHoras: 0, totalCancelamentos: 0, quadraMaisPopular: "Nenhuma", maiorVolume: -1 }
    );

    return (
        <section className="w-full h-screen bg-gray-50/50 overflow-hidden flex flex-col">
            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">

                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl shadow-sm border border-indigo-100">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Ocupação de Quadras</h2>
                            <p className="text-xs text-gray-500">Analise a demanda, horários e índices de uso do complexo</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 self-end sm:self-center">
                        <SubmitButton
                            type="button"
                            estilo="perigo"
                            onClick={handleExportarPDF}
                            disabled={dados.length === 0 || loading}
                        >
                            <FileDown size={16} />
                            <span>Exportar Relatório</span>       
                        </SubmitButton>
                    </div>
                </header>

                <section className="bg-white p-4 lg:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 flex-shrink-0">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filtrar Período</h3>
                        <SubmitButton
                            estilo="fantasma"
                            className="text-xs text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg px-2.5 py-1 h-auto transition-all"
                            onClick={limparFiltros}
                        >
                            Resetar Filtros
                        </SubmitButton>
                    </div>
                        
                    <OcupacaoFiltrosForm
                        types={filters}
                        handle={handleFilters}
                    />
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-shrink-0">
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quadra Mais Popular</span>
                        <span className="text-xl font-bold text-indigo-600 truncate">
                            {totaisTela.quadraMaisPopular}
                        </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Horas Jogadas (No Filtro)</span>
                        <span className="text-xl font-bold text-gray-900">
                            {totaisTela.totalHoras}h
                        </span>
                    </div>
                
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Agendamentos Cancelados</span>
                        <span className="text-xl font-bold text-red-600">
                            {totaisTela.totalCancelamentos}
                        </span>
                    </div>
                </section>

                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto min-h-0">
                        <CustomTable
                            columns={colunas}
                            data={dados}
                            isLoading={loading}
                        />
                    </div>

                    <div className="bg-gray-50/50 px-6 py-3.5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-500">
                            Mostrando <span className="text-gray-800 font-semibold">{dados.length}</span> de <span className="text-gray-800 font-semibold">{totalGeral}</span> quadras analisadas
                        </span>
                        
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-black hover:bg-gray-50 transition-all disabled:opacity-40"
                                disabled={page === 1}
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
                                        const maxPaginas = Math.ceil(totalGeral / limit) || 1;
                                        if(valor > maxPaginas) valor = maxPaginas;
                                        trocarPagina(valor);
                                    }}
                                    min={1}
                                    max={Math.ceil(totalGeral / limit) || 1}
                                    className="w-8 text-center font-bold text-indigo-600 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="text-gray-400 font-normal">de {Math.ceil(totalGeral / limit) || 1}</span>
                            </div>

                            <button
                                type="button"
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-black hover:bg-gray-50 transition-all disabled:opacity-40"
                                disabled={naoTemProximaPagina}
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