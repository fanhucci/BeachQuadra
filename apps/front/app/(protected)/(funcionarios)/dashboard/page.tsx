'use client'
import SubmitButton from "@/components/buttonComponents/submitButton";
import DashboardFiltrosForm from "@/components/dashboardComponents/DashboardFiltrosForm";

import useFilter from "@/hooksGenericos/useFilter";

export default function DashboardPage(){

    const valoresIniciais = {

    }

    const {queryString, filters, handleFilters, limparFiltros} = useFilter(valoresIniciais);

    return(
        <div>
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

                <DashboardFiltrosForm
                    handle={handleFilters}
                    types={filters}
                />
            </section>

           
        </div>
    )
}