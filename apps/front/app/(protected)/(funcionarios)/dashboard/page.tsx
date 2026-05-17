'use client'
import SubmitButton from "@/components/buttonComponents/submitButton";
import DashboardFiltrosForm from "@/components/dashboardComponents/dashboardFiltrosForm";



import useFilter from "@/hooksGenericos/useFilter";
import { useState } from "react";

export default function DashboardPage(){

    const valoresIniciais = {

    }

    const {queryString, filters, handleFilters, limparFiltros} = useFilter(valoresIniciais);

    const [loading,setLoading] = useState<boolean>(false);

    const popularDashboard = async ()=>{
        try {
            setLoading(true)
        } catch (error) {
            
        }
        finally{
            setLoading(false);
        }
    }

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