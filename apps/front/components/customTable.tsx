
interface Column<T>{
  key: keyof T | string;
  label: string;
  render?: (value: any, record: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function CustomTable<T>({
  data,
  columns,
}: CustomTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      
      <table className="w-full text-sm">

     
        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 text-center">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

     
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 transition">

              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-center">
                  {row[col.key] as any}
                </td>
              ))}

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

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