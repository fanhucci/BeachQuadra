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