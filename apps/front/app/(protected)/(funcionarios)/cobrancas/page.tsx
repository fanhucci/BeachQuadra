'use client'

import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { NovaCobrancaSchema, EditarCobrancaSchema, Cobranca, CobrancaSearch } from "@app/shared";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { ChevronLeft, ChevronRight, Banknote, Plus, FileDown } from "lucide-react";
import useCobrancaTable from "@/components/cobrancasComponents/cobrancaTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import CobrancasFiltrosForm from "../../../../components/cobrancasComponents/cobrancasFiltrosForm";
import { gerarPDFCobranças } from "@/utils/pdfHandler";
import { apiRequest } from "@/utils/apiHandler";


export default function CobrancasPage(){
    

    const {queryString, filters, page, limit, handleFilters, limparFiltros, proximaPagina, voltarPagina, trocarPagina} = useFilter<CobrancaSearch>({
        nome:'',
        page:1,
        limit:10
    });

    const {
        loading,
        dados,
    } = usePageCrud<Cobranca>({
        idKey:'id_cobranca',
        endpoint:'cobrancas',
        filtro: queryString,
        criarSchema: NovaCobrancaSchema,
        editarSchema: EditarCobrancaSchema
    });

    const {colunas} = useCobrancaTable();

    const totalGeral = dados[0]?.total_geral ?? 0;
    const naoTemProximaPagina = (page * limit) >= totalGeral;

    const handleExportarPDF = async () => { 
    
        const partesFiltro = [];
        if (filters.nome) partesFiltro.push(`Nome: "${filters.nome}"`);
        if (filters.data_inicio) partesFiltro.push(`De: "${filters.data_inicio}"`);
        if (filters.data_fim) partesFiltro.push(`Até: "${filters.data_fim}"`);
        if (filters.pagamento) partesFiltro.push(`Status: "${filters.pagamento}"`);

        const textoFiltros = partesFiltro.length > 0 
            ? partesFiltro.join(" | ") 
            : "Nenhum (Todos os registros filtrados)";

        try {

            const filtroIlimitado = queryString.replace('limit=10', `limit=${totalGeral}`);

            const resultado = await apiRequest(`/cobrancas?${filtroIlimitado}`);

            const listaFinal = Array.isArray(resultado) ? resultado : (resultado?.dados || []);

            gerarPDFCobranças(listaFinal, textoFiltros);

        } catch (error) {
            console.error("Erro ao buscar dados para o PDF:", error);
            gerarPDFCobranças(dados, `${textoFiltros} (Parcial - Erro ao buscar todos)`);
        }
    };

    const totaisTela = dados.reduce(
        (acc, item) => {
            const valorNum = Number(item.valor) || 0;
    
            if(item.status.toLowerCase() === "concluido" || item.status.toLowerCase() === "pendente" ){
                acc.totalGeral += valorNum;
            }
                    
            if (item.status.toLowerCase() === "concluido") {
                acc.totalRecebido += valorNum;
            } else if (item.status.toLowerCase() === "pendente") {
                acc.totalPendente += valorNum;
            }
    
            return acc;
        },
        { totalGeral: 0, totalRecebido: 0, totalPendente: 0 }
    );



    return (

        <section className="w-full h-screen bg-gray-50/50 overflow-hidden flex flex-col">

            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">

                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                            <Banknote size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Gestão de Cobranças</h2>
                            <p className="text-xs text-gray-500">Visualize e gerencie as cobranças do sistema</p>
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
                            <span>Exportar PDF</span>       
                        </SubmitButton>

                        <LinkButton 
                            estilo="primario"
                            href={'/usuarios/agendar'}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 font-semibold text-sm shadow-sm transition-all"
                        >
                            <Plus size={16} />
                            <span>Nova Cobrança</span>
                        </LinkButton>
                    </div>
                </header>

                <section className="bg-white p-4 lg:p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-4 flex-shrink-0">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Busca Avançada</h3>
                        <SubmitButton
                            estilo="fantasma"
                            className="text-xs text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg px-2.5 py-1 h-auto transition-all"
                            onClick={limparFiltros}
                        >
                            Resetar Filtros
                        </SubmitButton>
                    </div>
                        
                    <CobrancasFiltrosForm
                        types={filters}
                        handle={handleFilters}
                    />
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-shrink-0">
                
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Faturado (Página)</span>
                        <span className="text-xl font-bold text-gray-900">
                            R$ {totaisTela.totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                

                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Recebido</span>
                        <span className="text-xl font-bold text-green-600">
                            R$ {totaisTela.totalRecebido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                
                    <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Pendente</span>
                        <span className="text-xl font-bold text-red-600">
                            R$ {totaisTela.totalPendente.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
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
                            Mostrando <span className="text-gray-800 font-semibold">{dados.length}</span> de <span className="text-gray-800 font-semibold">{totalGeral}</span> registros
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
                                    className="w-8 text-center font-bold text-blue-600 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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