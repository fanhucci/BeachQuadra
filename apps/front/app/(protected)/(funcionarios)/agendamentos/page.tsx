'use client'

import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { Agendamento, AgendamentoSearch, EditarAgendamentoSchema, NovoAgendamentoSchema} from "@app/shared";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { Contact, Plus } from "lucide-react";

import useAgendamentoTable from "@/components/agendamentosComponents/useAgendamentoTable";
import AgendamentosFiltrosForm from "@/components/agendamentosComponents/AgendamentosFiltrosForm";
import LinkButton from "@/components/buttonComponents/linkButton";



export default function AgendamentosPage(){
    const {queryString, filters, handleFilters, limparFiltros} = useFilter<AgendamentoSearch>({
        search:'',
        status:'pendente',
        periodo:''
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

    } = usePageCrud<Agendamento>({
        idKey:'id_agendamento',
        endpoint:'agendamentos',
        filtro: queryString,
        criarSchema: NovoAgendamentoSchema,
        editarSchema: EditarAgendamentoSchema
    });

    const {colunas} = useAgendamentoTable();

    return(
        <main className="flex flex-col flex-1 p-6 gap-6 bg-gray-50/30">

            <header className="flex items-center justify-between gap-2 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Contact className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Gestão de Agendamentos</h2>
                        <p className="text-sm text-gray-500">Visualize e gerencie os agendamentos do sistema</p>
                    </div>
                </div>
                
                <LinkButton 
                    estilo="primario"
                    href={'/usuarios/agendar/'}>
                    <Plus size={20} />
                    <span>Novo Agendamento</span>
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
                    
                <AgendamentosFiltrosForm
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

        </main>
    );
}

