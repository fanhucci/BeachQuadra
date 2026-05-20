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
        ativo:true
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
        <section className="flex flex-col flex-1 p-6 gap-6 bg-gray-50/30">

            <header className="flex items-center justify-between gap-2 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <SquareChartGantt className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Gestão de Quadras</h2>
                        <p className="text-sm text-gray-500">Visualize e gerencie as quadras do sistema</p>
                    </div>
                </div>
                
                <SubmitButton estilo="primario" onClick={abrirModal}>
                    <Plus size={20} />
                    <span>Nova Quadra</span>
                </SubmitButton>
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
                    
                <QuadrasFiltrosForm
                    types={filters}
                    handle={handleFilters}
                />

            </section>

            <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <CustomTable
                    columns={colunas}
                    data={dados}
                    isLoading={loading}
                />
            </section>

            <CustomModal
                titulo={
                    editionOn
                    ? 'Editar'
                    : 'Cadastrar'
                }
                estado={modalOn}
                fechar={fecharModal}
                heigth="100"
                botoes={[
                    {
                        label:'Cancelar',
                        estilo:'secundario',
                        onClick:fecharModal,
                        isLoading:buttonLoading
                    },
                    {
                        label:editionOn
                            ? 'Editar'
                            : 'Cadastrar',
                        estilo:'primario',
                        onClick:editionOn
                            ? editar
                            : adicionar,
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

