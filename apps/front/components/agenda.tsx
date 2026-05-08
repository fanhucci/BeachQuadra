import { Check } from "lucide-react";

export default function Agenda({
    dados, 
    idQuadraEspecifica,
    selecionados = [],
    aoSelecionar
}: {
    dados: any[],
    idQuadraEspecifica?: number,
    selecionados?: any[],
    aoSelecionar?: (slot: any) => void
}) {
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    return (
        <div className="flex-1 flex flex-col w-full max-w-6xl border rounded-xl bg-white shadow-sm p-3">

           <div className="grid grid-cols-7 gap-2 mb-2 text-center ">
                {tableHeaders.map((label, index) => {
                    const slotDoDia = dados[index * 17]; 
                    const diaMes = slotDoDia 
                        ? `${new Date(slotDoDia.horario).toLocaleDateString('pt-br',{ day:'2-digit', month:'2-digit', timeZone:'utc'})}`
                        : "";

                    return (
                        <div key={label} className="flex flex-col">
                            <span className="text-[10px] uppercase text-gray-400 font-bold">
                                {label}
                            </span>
                            <span className="text-sm font-semibold text-gray-700">
                                {diaMes}
                            </span>
                        </div>
                    );
                })}
            </div>

  
            <div 
                className="grid grid-flow-col gap-2"
                style={{
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gridTemplateRows: 'repeat(17, minmax(0, 1fr))'
                }}
            >
                {dados.map((slot) => {
                    const temReserva = slot.id_agendamento !==null;
                    const avaliable = idQuadraEspecifica 
                        ? !temReserva && slot.permitido
                        : slot.disponivel.length > 0;

                    const isSelected = selecionados.some(s => s.horario === slot.horario);
                    const horaFormatada = new Date(slot.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone:"utc" });

                    return (
                        <div key={slot.horario} className="h-10">
                            <Slot 
                                title={horaFormatada}
                                isBlocked={!slot.permitido}
                                isAvaliable={avaliable}
                                hasAgendamento={!!slot.id_agendamento}
                                isSelected={isSelected}
                                action={() => aoSelecionar?.(slot)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Slot({
    title,
    action,
    isAvaliable,
    isBlocked,
    isSelected,
    hasAgendamento
}:{ 
    title:string,
    action?:()=>void,
    isAvaliable:boolean,
    isBlocked:boolean,
    isSelected:boolean,
    hasAgendamento:boolean,
}){
    const desativado = isBlocked || (!isAvaliable && hasAgendamento);

    return(
        <button
            type="button"
            onClick={action}
            disabled={desativado}
            className={` 
                    w-full h-full rounded-md text-[14px] font-medium
                    flex items-center justify-center
                    transition border
                    ${
                        isSelected
                            ? "bg-blue-600 text-white border-blue-700 cursor-pointer hover:bg-blue-500"
                            :isBlocked
                                ?"bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                                :isAvaliable
                                    ?"bg-green-50 text-green-700 border-green-200 cursor-pointer hover:bg-green-100"
                                    :hasAgendamento
                                        ?"bg-yellow-200 text-yellow-700 border-yellow-200 cursor-pointer hover:bg-yellow-100"
                                        :"bg-red-50 text-red-700 border-red-200 cursor-not-allowed hover:bg-red-100"
                    }
            `}
        >
            {isSelected? (<Check size={16}/>) : title}
        </button>
    )
}