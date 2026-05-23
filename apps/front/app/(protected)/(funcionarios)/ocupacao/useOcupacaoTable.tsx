'use client'

import { Column } from "@/components/customTable";
import { Ocupacao } from "@app/shared";
import { useMemo } from "react";
import { Layers, TrendingDown } from "lucide-react";

export default function useOcupacaoTable() {

    const ocupacaoStyles = {
        alta: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200", dot: "bg-indigo-500", label: "Alta Demanda" },
        media: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500", label: "Uso Moderado" },
        baixa: { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", dot: "bg-gray-400", label: "Ociosa" },
    };

    const colunas = useMemo<Column<Ocupacao>[]>(() => [
        { 
            key: "id_quadra", 
            label: "ID",
            align: "center",
            render: (value: string) => <span className="font-mono text-gray-900 font-semibold">#{value}</span>
        },
        { 
            key: 'nome', 
            label: 'Quadra / Complexo',
            render: (value: string, row) => {
                const labelCategoria = row.tipo === 'individual' ? 'Individual' : 'Duplas';
                
                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{value}</span>
                        <span className="text-xs text-gray-400 font-normal flex items-center gap-1">
                            <Layers size={11} /> {labelCategoria}
                        </span>
                    </div>
                );
            }
        },
        { 
            key: 'total_reservas',
            label: 'Horas Jogadas',
            align: 'center',
            render: (value: number) => (
                <div className="flex items-center justify-center gap-1.5">
                    <span className="text-gray-900 font-bold">{value}h</span>
                </div>
            )
        },
        { 
            key: 'total_cancelamentos',
            label: 'Cancelamentos',
            align: 'center',
            render: (value: number) => (
                <span className={`font-semibold ${value > 5 ? 'text-red-600' : 'text-gray-500'}`}>
                    {value}
                </span>
            )
        },
        {
            key: 'taxa_cancelamento',
            label: 'Índice de Desistência',
            align: 'left',
            render: (_, row) => {
                const reservas = Number(row.total_reservas) || 0;
                const cancelamentos = Number(row.total_cancelamentos) || 0;
                const totalTentativas = reservas + cancelamentos;
                const taxa = totalTentativas > 0 ? Math.round((cancelamentos / totalTentativas) * 100) : 0;

                if (taxa > 20) {
                    return (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                            <TrendingDown size={12} /> {taxa}% (Alto)
                        </span>
                    );
                }

                return <span className="text-xs font-medium text-gray-500">{taxa}%</span>;
            }
        },
        { 
            key: "total_reservas", 
            label: "Status de Uso",
            align: "left",
            render: (value: number) => {
                let statusKey: 'alta' | 'media' | 'baixa' = "media";
                if (value >= 40) statusKey = "alta";
                if (value <= 10) statusKey = "baixa";

                const style = ocupacaoStyles[statusKey];

                return (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-sm select-none`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
                        {style.label}
                    </span>
                );
            }
        }
    ], []);

    return {
        colunas
    };
}