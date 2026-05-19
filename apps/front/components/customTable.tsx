'use client'

import React from "react";
import { Inbox } from "lucide-react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, record: T) => React.ReactNode;
  align?: "left" | "center" | "right"; 
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  rowKey?: keyof T | ((record: T, index: number) => string | number); // Otimização de performance para o React
}

export default function CustomTable<T>({
  data,
  columns,
  isLoading,
  rowKey,
}: CustomTableProps<T>) {
  
  const getRowKey = (row: T, index: number): string | number => {
    if (typeof rowKey === "function") return rowKey(row, index);
    if (rowKey && row[rowKey]) return String(row[rowKey]);
    return index;
  };

  return (
    <div className="relative overflow-hidden bg-white transition-all min-h-[240px] flex flex-col justify-between">
      
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px] transition-all duration-200">
          <div className="flex flex-col items-center gap-2.5">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-600 border-t-transparent shadow-sm"></div>
            <span className="text-xs font-semibold text-blue-600 tracking-wide">Carregando dados...</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-full flex-1">
        <table className="w-full text-sm text-left border-collapse"> 
          <thead className="bg-gray-50/70 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold tracking-wider select-none">
            <tr>
              {columns.map((col) => {
                const alignmentClass = 
                  col.align === "center" ? "text-center" : 
                  col.align === "right" ? "text-right" : "text-left";
                
                return (
                  <th 
                    key={String(col.key)} 
                    className={`px-6 py-4 font-bold ${alignmentClass}`}
                  >
                    {col.label}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.length > 0 && data.map((row, rowIndex) => (
              <tr 
                key={getRowKey(row, rowIndex)} 
                className="group hover:bg-blue-50/20 transition-colors duration-150 ease-in-out"
              >
                {columns.map((col) => {
                  const alignmentClass = 
                    col.align === "center" ? "text-center" : 
                    col.align === "right" ? "text-right" : "text-left";

                  return (
                    <td 
                      key={String(col.key)} 
                      className={`px-6 py-4 whitespace-nowrap text-gray-600 group-hover:text-gray-900 font-medium transition-colors ${alignmentClass}`}
                    >
                      {col.render
                        ? col.render(row[col.key as keyof T], row)
                        : (row[col.key as keyof T] as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isLoading && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center mx-auto max-w-md animate-fade-in">
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4 shadow-inner-sm text-gray-400 group-hover:scale-105 transition-transform">
            <Inbox className="h-7 w-7 stroke-[1.5]" />
          </div>
          <h3 className="text-gray-900 font-semibold text-base tracking-tight">Nenhum registro encontrado</h3>
          <p className="text-gray-400 text-xs mt-1.5 max-w-xs leading-relaxed">
            Sua busca não retornou dados. Tente modificar os termos pesquisados ou limpar os filtros avançados.
          </p>
        </div>
      )}
    </div>
  );
}