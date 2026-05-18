'use client'

import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { NovaCobrancaSchema, EditarCobrancaSchema, Cobranca, CobrancaSearch } from "@app/shared";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { ArrowBigLeft, ArrowBigRight, Banknote, Plus } from "lucide-react";
import useCobrancaTable from "@/components/cobrancasComponents/cobrancaTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import CobrancasFiltrosForm from "../../../../components/cobrancasComponents/cobrancasFiltrosForm";


export default function CobrancasPage(){
    
    const {queryString, filters, page, limit, handleFilters, limparFiltros, proximaPagina, voltarPagina} = useFilter<CobrancaSearch>({
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

    return(
        <main className="flex flex-col flex-1 p-6 gap-6 bg-gray-50/30">

            <header className="flex items-center justify-between gap-2 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Banknote className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Gestão de Cobranças</h2>
                        <p className="text-sm text-gray-500">Visualize e gerencie as cobranças do sistema</p>
                    </div>
                </div>
                
                <LinkButton 
                    estilo="primario"
                    href={'/usuarios/agendar'}
                >
                    <Plus size={20} />
                    <span>Nova Cobrança</span>
                </LinkButton>
            </header>



            <section className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">

                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Busca Avançada</h3>
                    <SubmitButton
                        estilo="fantasma"
                        className="text-xs text-red-500 hover:text-red-600 h-8"
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

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex flex-row justify-around gap-4 p-4">
                    <SubmitButton
                        className="w-fit"
                        estilo="secundario"
                        disabled={page === 1}
                        onClick={voltarPagina}
                        isLoading={loading}
                    >
                        <ArrowBigLeft size={16}/>
                    </SubmitButton>

                    <SubmitButton
                        className="w-fit"
                        estilo="secundario"
                        disabled={naoTemProximaPagina}
                        onClick={proximaPagina}
                        isLoading={loading}
                    >
                        <ArrowBigRight size={16}/>
                    </SubmitButton>
                </div>
                <CustomTable
                    columns={colunas}
                    data={dados}
                    isLoading={loading}
                />
            </section>

        </main>
    );
}

