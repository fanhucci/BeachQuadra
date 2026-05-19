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
        <main className="flex-1 w-full bg-gray-50/50 min-h-screen">

            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] p-4 sm:p-6 lg:p-8 flex flex-col gap-6">

                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                            <Banknote size={26} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 tracking-tight lg:text-3xl">Gestão de Cobranças</h2>
                            <p className="text-sm text-gray-500 mt-0.5">Visualize e gerencie as cobranças do sistema</p>
                        </div>
                    </div>
                    
                    <LinkButton 
                        estilo="primario"
                        href={'/usuarios/agendar'}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 font-semibold text-sm shadow-sm transition-all"
                    >
                        <Plus size={18} />
                        <span>Nova Cobrança</span>
                    </LinkButton>
                </header>

                <section className="bg-white p-5 lg:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-5">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Busca Avançada</h3>
                        <SubmitButton
                            estilo="fantasma"
                            className="text-xs text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg px-3 py-1.5 h-auto transition-all"
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

                <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                
                    <div className="flex-1">
                        <CustomTable
                            columns={colunas}
                            data={dados}
                            isLoading={loading}
                        />
                    </div>

                    <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-xs font-medium text-gray-500">
                            Mostrando <span className="text-gray-800 font-semibold">{dados.length}</span> de <span className="text-gray-800 font-semibold">{totalGeral}</span> registros registrados
                        </span>
                        
                        <div className="flex items-center gap-3">
                            <SubmitButton
                                className="h-9 w-9 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40"
                                estilo="secundario"
                                disabled={page === 1}
                                onClick={voltarPagina}
                                isLoading={loading}
                            >
                                <ChevronLeft size={16}/>
                            </SubmitButton>

                            <div className="flex items-center gap-1.5 text-xs font-semibold px-3 h-9 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700">
                                <span>Página</span>
                                <input
                                    type="number"
                                    value={page ?? 1}
                                    onChange={(e) => trocarPagina(e.target.value)}
                                    className="w-10 text-center font-bold text-blue-600 bg-transparent focus:outline-none border-b border-transparent focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                                <span className="text-gray-400 font-normal">de {Math.ceil(totalGeral / limit) || 1}</span>
                            </div>

                            <SubmitButton
                                className="h-9 w-9 p-0 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40"
                                estilo="secundario"
                                disabled={naoTemProximaPagina}
                                onClick={proximaPagina}
                                isLoading={loading}
                            >
                                <ChevronRight size={16}/>
                            </SubmitButton>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}