'use client'

import CustomTable from "@/components/customTable";
import useResrva from "./useReserva"

export default function ReservasPage(){
    const hook = useResrva();

    return(
        <div className="flex flex-col flex-1 p-6 gap-4">
            <CustomTable columns={hook.columns} data={hook.reservas}/>
        </div>
    )
}