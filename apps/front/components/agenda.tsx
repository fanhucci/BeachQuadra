import { useState } from "react";
import { Check } from "lucide-react";

export default function Agenda({
    dados,
    contexto = 'reserva',
    idQuadraEspecifica,
    selecionados = [],
    loading,
    aoSelecionar
}: {
    dados: any[],
    idQuadraEspecifica?: number;
    contexto?: 'reserva' | 'agenda';
    selecionados?: any[],
    loading?: boolean,
    aoSelecionar?: (slot: any) => void
}) {
    const tableHeaders = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    
    const [diaAtivoMobile, setDiaAtivoMobile] = useState<number>(0);

    const slotsPorDia = 17;

    const obterDadosFiltradosMobile = () => {
        const inicio = diaAtivoMobile * slotsPorDia;
        return dados.slice(inicio, inicio + slotsPorDia);
    };

    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto border rounded-xl relative bg-white shadow-sm p-2 sm:p-4">

            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[1px] rounded-xl">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            <div className="flex md:grid md:grid-cols-7 gap-1.5 sm:gap-2 mb-4 overflow-x-auto no-scrollbar pb-2 md:pb-0 border-b md:border-none">
                {tableHeaders.map((label, index) => {
                    const slotDoDia = dados[index * slotsPorDia];
                    const diaMes = slotDoDia
                        ? `${new Date(slotDoDia.horario).toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', timeZone: 'utc' })}`
                        : "";

                    const isSelectedMobile = diaAtivoMobile === index;

                    return (
                        <button
                            key={label}
                            type="button"
                            onClick={() => setDiaAtivoMobile(index)}
                            className={`flex flex-col items-center justify-center flex-1 min-w-[75px] md:min-w-0 p-2 rounded-lg md:bg-transparent transition
                                ${isSelectedMobile ? 'bg-blue-50 text-blue-600 border border-blue-200 md:border-none md:bg-transparent' : 'text-gray-500'}
                            `}
                        >
                            <span className="text-[9px] sm:text-[10px] uppercase text-gray-400 font-bold tracking-wider">
                                {label}
                            </span>
                            <span className={`text-xs sm:text-sm font-semibold ${isSelectedMobile ? 'text-blue-600 md:text-gray-700' : 'text-gray-700'}`}>
                                {diaMes || '--/--'}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:hidden">
                {obterDadosFiltradosMobile().map((slot) => (
                    <div key={slot.horario} className="h-11">
                        <RenderSlot 
                            slot={slot} 
                            contexto={contexto} 
                            selecionados={selecionados} 
                            aoSelecionar={aoSelecionar} 
                        />
                    </div>
                ))}
            </div>

            <div
                className="hidden md:grid grid-flow-col gap-2"
                style={{
                    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                    gridTemplateRows: 'repeat(17, minmax(0, 1fr))'
                }}
            >
                {dados.map((slot) => (
                    <div key={slot.horario} className="h-10 xl:h-12 flex items-center justify-center">
                        <RenderSlot 
                            slot={slot} 
                            contexto={contexto} 
                            selecionados={selecionados} 
                            aoSelecionar={aoSelecionar} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}


function RenderSlot({ slot, contexto, selecionados, aoSelecionar }: any) {
    const str = slot.horario;
    const dataSemFuso = new Date(str.split('Z')[0]);
    const agora = new Date();

    const isPassado = dataSemFuso.getTime() < agora.getTime();
    const temReserva = slot.agendamentos[0]?.id_agendamento !== null;

    const blocked = contexto === 'agenda'
        ? !slot.permitido
        : (!slot.permitido || isPassado);
        
    const avaliable = contexto === 'agenda'
        ? !temReserva && slot.permitido
        : slot.disponivel.length > 0;

    const isSelected = selecionados.some((s: any) =>
        new Date(s.horario).getTime() === new Date(slot.horario).getTime() &&
        slot.disponivel.some((d: any) => d.id_quadra === s.quadra.id_quadra)
    );
    
    const horaFormatada = new Date(slot.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: "utc" });

    return (
        <Slot
            title={horaFormatada}
            isBlocked={blocked}
            isAvaliable={avaliable}
            hasAgendamento={!!slot.agendamentos[0]?.id_agendamento && contexto === 'agenda'}
            isSelected={isSelected}
            action={(temReserva || contexto === 'reserva') ? () => aoSelecionar?.(slot) : undefined}
        />
    );
}

function Slot({
    title,
    action,
    isAvaliable,
    isBlocked,
    isSelected,
    hasAgendamento
}: {
    title: string,
    action?: () => void,
    isAvaliable: boolean,
    isBlocked: boolean,
    isSelected: boolean,
    hasAgendamento: boolean,
}) {
    const desativado = isBlocked || (!isAvaliable && !hasAgendamento);

    return (
        <button
            type="button"
            onClick={action}
            disabled={desativado}
            className={` 
                w-full h-full rounded-md text-xs sm:text-[14px] font-medium
                flex items-center justify-center
                transition border duration-200
                ${isSelected
                    ? "bg-blue-600 text-white border-blue-700 cursor-pointer hover:bg-blue-500"
                    : isBlocked
                        ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                        : isAvaliable
                            ? "bg-green-50 text-green-700 border-green-200 cursor-pointer hover:bg-green-100"
                            : hasAgendamento
                                ? "bg-yellow-100 text-yellow-700 border-yellow-200 cursor-pointer hover:bg-yellow-100"
                                : "bg-red-50 text-red-700 border-red-200 cursor-not-allowed hover:bg-red-100"
                }
            `}
        >
            {isSelected ? (<Check className="h-4 w-4" />) : title}
        </button>
    );
}