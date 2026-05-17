'use client'
import SubmitButton from "@/components/buttonComponents/submitButton";
import DashboardFiltrosForm from "@/components/dashboardComponents/dashboardFiltrosForm";



import useFilter from "@/hooksGenericos/useFilter";
import { Banknote } from "lucide-react";
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
        <main className="flex flex-col flex-1 p-6 gap-6 bg-gray-50/30">

            <header className="flex items-center justify-between gap-2 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <Banknote className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Dashboard</h2>
                        <p className="text-sm text-gray-500">Visualize os dados do sistema</p>
                    </div>
                </div>
                
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

                <DashboardFiltrosForm
                    handle={handleFilters}
                    types={filters}
                />
            </section>

            <section>
                
            </section>

           
        </main>
    )
}