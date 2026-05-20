'use client'

import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { EditarQuadraSchema, NovaQuadraSchema, Quadra, QuadraSearch } from "@app/shared";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { Plus, SquareChartGantt } from "lucide-react";
import useQuadrasTable from "@/components/quadrasComponents/useQuadrasTable";
import QuadrasFiltrosForm from "@/components/quadrasComponents/quadrasFiltrosForm";
import QuadraModalForm from "@/components/quadrasComponents/quadraModalForm";

export default function QuadrasPage(){
    const {queryString, filters, handleFilters, limparFiltros} = useFilter<QuadraSearch>({
        search:'',
        ativo:true,
        page:1,
        limit:10
    });

    const {
        loading,
        buttonLoading,
        dados,
        formData,
        erros,
        modalOn,
        editionOn,
        adicionar,
        editar,
        ativar,
        desativar,
        handleChange,
        abrirEdicao,
        abrirModal,
        fecharModal
    } = usePageCrud<Quadra>({
        idKey:'id_quadra',
        endpoint:'quadras',
        filtro: queryString,
        criarSchema: NovaQuadraSchema,
        editarSchema: EditarQuadraSchema
    });

    const {colunas} = useQuadrasTable({
        editar:abrirEdicao,
        ativar:ativar,
        desativar:desativar
    });

    return(
        <section className="w-full h-screen bg-gray-50/50 overflow-hidden flex flex-col">
            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] h-full min-h-0 p-4 sm:p-6 lg:p-8 flex flex-col gap-4">

                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                            <SquareChartGantt size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Gestão de Quadras</h2>
                            <p className="text-xs text-gray-500">Visualize e gerencie as quadras do sistema</p>
                        </div>
                    </div>
                    
                    <SubmitButton 
                        estilo="primario" 
                        onClick={abrirModal}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 font-semibold text-sm shadow-sm transition-all"
                    >
                        <Plus size={16} />
                        <span>Nova Quadra</span>
                    </SubmitButton>
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
                        
                    <QuadrasFiltrosForm
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
                </section>

            </div>

            <CustomModal
                titulo={editionOn ? 'Editar Quadra' : 'Cadastrar Quadra'}
                estado={modalOn}
                fechar={fecharModal}
                width="max-w-xl w-full"
                botoes={[
                    {
                        label:'Cancelar',
                        estilo:'secundario',
                        onClick:fecharModal,
                        disabled:buttonLoading
                    },
                    {
                        label: editionOn ? 'Salvar Alterações' : 'Cadastrar',
                        estilo:'primario',
                        onClick: editionOn ? editar : adicionar,
                        isLoading:buttonLoading
                    },
                ]}
            >
                <QuadraModalForm
                    formData={formData}
                    erros={erros}
                    handleChange={handleChange}
                />
            </CustomModal>
        </section>
    );
}