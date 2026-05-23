'use client'

import { useState } from "react";
import HistoricoClienteFiltrosForm from "../HistoricoClienteFiltrosForm";
import CustomTable from "@/components/customTable";
import useHistoricoClienteTable from "@/hooks/useHistoricoClienteTable";

export default function PerfilHsitorico({ id_usuario }: { id_usuario: number }) {
    const { colunas } = useHistoricoClienteTable();
    
    const [filtros, setFiltros] = useState({
        data_inicio: "",
        data_fim: "",
        status_reserva: "",
        status_cobranca: "",
        tipo_quadra: ""
    });

    const metricas = {
        totalAgendamentos: 24,
        totalHoras: 32,
        valorGasto: 1450.00,
        taxaCancelamento: 8,
        ultimaReserva: "22/05/2026"
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 border p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500 font-medium uppercase">Agendamentos</p>
                    <p className="text-xl font-bold text-gray-900">{metricas.totalAgendamentos}</p>
                </div>
                <div className="bg-gray-50 border p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500 font-medium uppercase">Horas Jogadas</p>
                    <p className="text-xl font-bold text-gray-900">{metricas.totalHoras}h</p>
                </div>
                <div className="bg-gray-50 border p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500 font-medium uppercase">Total Gasto</p>
                    <p className="text-xl font-bold text-emerald-600">R$ {metricas.valorGasto.toFixed(2)}</p>
                </div>
                <div className="bg-gray-50 border p-4 rounded-xl text-center">
                    <p className="text-xs text-gray-500 font-medium uppercase">Cancelamentos</p>
                    <p className="text-xl font-bold text-red-600">{metricas.taxaCancelamento}%</p>
                </div>
                <div className="bg-gray-50 border p-4 rounded-xl text-center col-span-2 md:col-span-1">
                    <p className="text-xs text-gray-500 font-medium uppercase">Última Reserva</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">{metricas.ultimaReserva}</p>
                </div>
            </div>

            <div className="bg-white p-4 border rounded-xl shadow-sm">
                <HistoricoClienteFiltrosForm 
                    types={filtros} 
                    handle={(e) => setFiltros(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    clientesDisponiveis={[]}
                />
            </div>

            {/* Listagem (Requisito: Relatório de Histórico) */}
            <div className="bg-white shadow rounded-2xl overflow-hidden">
                <CustomTable columns={colunas} data={[]} totalRows={0} page={1} setPage={() => {}} />
            </div>
        </div>
    );
}