'use client'

import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { NovaCobrancaSchema, EditarCobrancaSchema, Cobranca, CobrancaSearch } from "@app/shared";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { ChevronLeft, ChevronRight, Banknote, Plus } from "lucide-react";
import useCobrancaTable from "@/components/cobrancasComponents/cobrancaTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import CobrancasFiltrosForm from "../../../../components/cobrancasComponents/cobrancasFiltrosForm";

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

    return (

        <main className="w-full h-screen bg-gray-50/50 overflow-hidden flex flex-col">

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
                    
                    <LinkButton 
                        estilo="primario"
                        href={'/usuarios/agendar'}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 font-semibold text-sm shadow-sm transition-all"
                    >
                        <Plus size={16} />
                        <span>Nova Cobrança</span>
                    </LinkButton>
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
                            <SubmitButton
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40"
                                estilo="secundario"
                                disabled={page === 1}
                                onClick={voltarPagina}
                                isLoading={loading}
                            >
                                <ChevronLeft color="#000000" size={14}/>
                            </SubmitButton>

                            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 h-8 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700">
                                <span>Página</span>
                                <input
                                    type="number"
                                    value={page}
                                    onChange={(e) => {
                                        let valor = Number(e.target.value) ?? 1;
                                        if(valor>Math.ceil(totalGeral / limit)) valor = Math.ceil(totalGeral / limit);
                                        trocarPagina(valor)
                                    }}
                                    min={1}
                                    max={Math.ceil(totalGeral / limit) || 1}
                                    className="w-8 text-center font-bold text-blue-600 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="text-gray-400 font-normal">de {Math.ceil(totalGeral / limit) || 1}</span>
                            </div>

                            <SubmitButton
                                className="h-8 w-8 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40"
                                estilo="secundario"
                                disabled={naoTemProximaPagina}
                                onClick={proximaPagina}
                                isLoading={loading}
                            >
                                <ChevronRight color="#000000" size={14}/>
                            </SubmitButton>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}