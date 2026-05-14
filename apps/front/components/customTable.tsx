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
}

export default function CustomTable<T>({
  data,
  columns,
  isLoading,
}: CustomTableProps<T>) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all">
      

      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left"> 
          <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              {columns.map((col) => (
                <th 
                  key={String(col.key)} 
                  className={`px-6 py-4 ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="group hover:bg-blue-50/30 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td 
                    key={String(col.key)} 
                    className={`px-6 py-4 whitespace-nowrap text-gray-600 group-hover:text-gray-900 ${
                      col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {col.render
                      ? col.render(row[col.key as keyof T], row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!isLoading && data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-gray-50 p-4 rounded-full mb-4">
            <Inbox className="h-8 w-8 text-gray-300" />
          </div>
          <h3 className="text-gray-900 font-medium">Nenhum registro</h3>
          <p className="text-gray-500 text-xs mt-1">
            Não encontramos dados para os filtros aplicados.
          </p>
        </div>
      )}
    </div>
  );
}
// interface Column<T>{
//   key: keyof T | string;
//   label: string;
//   render?: (value: any, record: T) => React.ReactNode;
// }

// interface CustomTableProps<T> {
//   data: T[];
//   columns: Column<T>[];
// }

// export default function CustomTable<T>({
//   data,
//   columns,
// }: CustomTableProps<T>) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      
//       <table className="w-full text-sm">

     
//         <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
//           <tr>
//             {columns.map((col) => (
//               <th key={String(col.key)} className="px-4 py-3 text-center">
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>

     
//         <tbody className="divide-y divide-gray-100">
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex} className="hover:bg-gray-50 transition">

//               {columns.map((col) => (
//                 <td key={String(col.key)} className="px-4 py-3 text-center">
//                   {row[col.key] as any}
//                 </td>
//               ))}

//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
// }

// export default function CustomTable<T>({
//   data,
//   columns,
// }: CustomTableProps<T>) {
//   return (
//     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
//           <tr>
//             {columns.map((col) => (
//               <th key={String(col.key)} className="px-4 py-3 text-center font-semibold">
//                 {col.label}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-100">
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
//               {columns.map((col) => (
//                 <td key={String(col.key)} className="px-4 py-3 text-center text-gray-700">

//                   {col.render
//                     ? col.render(row[col.key as keyof T], row)
//                     : (row[col.key as keyof T] as React.ReactNode)}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {data.length === 0 && (
//         <div className="flex flex-col items-center justify-center p-10 text-gray-500">
//           <p>Nenhum registro encontrado.</p>
//         </div>
//       )}
//     </div>
//   );
// }