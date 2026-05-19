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
    
    const slotsPorDia = 17;
    const colunasDias = Array.from({ length: 7 }, (_, diaIndex) => {
        const inicio = diaIndex * slotsPorDia;
        return dados.slice(inicio, inicio + slotsPorDia);
    });

    return (
        <div className="w-full h-full flex flex-col relative bg-white rounded-xl">
            
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                </div>
            )}

            <div className="w-full h-full overflow-x-auto overflow-y-hidden min-w-0 flex flex-col custom-scrollbar">
                
                <div className="min-w-[840px] md:min-w-full flex-1 flex flex-col h-full">
                    
                    <div className="grid grid-cols-7 gap-2 mb-3 border-b border-gray-100 pb-2 flex-shrink-0">
                        {tableHeaders.map((label, index) => {
                            const slotDoDia = dados[index * slotsPorDia];
                            const diaMes = slotDoDia
                                ? `${new Date(slotDoDia.horario).toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit', timeZone: 'utc' })}`
                                : "--/--";

                            return (
                                <div key={label} className="flex flex-col items-center justify-center py-1">
                                    <span className="text-[11px] uppercase text-gray-400 font-bold tracking-wider">
                                        {label}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-700">
                                        {diaMes}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-7 gap-2 flex-1 min-h-0 pb-1">
                        {colunasDias.map((slotsDoDia, diaIndex) => (
                            <div key={diaIndex} className="flex flex-col gap-2 h-full justify-between">
                                {slotsDoDia.map((slot) => {
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

                                    const isSelected = selecionados.some(s =>
                                        new Date(s.horario).getTime() === new Date(slot.horario).getTime() &&
                                        slot.disponivel.some((d: any) => d.id_quadra === s.quadra.id_quadra)
                                    );
                                    
                                    const horaFormatada = new Date(slot.horario).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: "utc" });

                                    return (
                                        <div key={slot.horario} className="flex-1 min-h-[34px] xl:min-h-[42px]">
                                            <Slot
                                                title={horaFormatada}
                                                isBlocked={blocked}
                                                isAvaliable={avaliable}
                                                hasAgendamento={!!slot.agendamentos[0]?.id_agendamento && contexto === 'agenda'}
                                                isSelected={isSelected}
                                                action={(temReserva || contexto === 'reserva') ? () => aoSelecionar?.(slot) : undefined}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                </div>
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
                w-full h-full rounded-lg text-xs xl:text-[13px] font-semibold
                flex items-center justify-center shadow-sm border box-border
                transition-all duration-150 active:scale-[0.98]
                ${isSelected
                    ? "bg-blue-600 text-white border-blue-700 cursor-pointer hover:bg-blue-500"
                    : isBlocked
                        ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed shadow-none"
                        : isAvaliable
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60 cursor-pointer hover:bg-emerald-100 hover:border-emerald-300"
                            : hasAgendamento
                                ? "bg-amber-100 text-amber-800 border-amber-200 cursor-pointer hover:bg-amber-200/80"
                                : "bg-rose-50 text-rose-700 border-rose-200/60 cursor-not-allowed hover:bg-rose-100/80"
                }
            `}
        >
            {isSelected ? (<Check size={16} strokeWidth={2.5} />) : title}
        </button>
    );
}