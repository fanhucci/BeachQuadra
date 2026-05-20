'use client'

import SubmitButton from "@/components/buttonComponents/submitButton";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Usuario } from "@app/shared";
import Agenda from "../agenda";
import useAgenda, { HorarioSelecionado } from "./useAgenda";
import CustomModal from "../customModal";
import Campo from "../inputsComponents/campo";

import BuscarCliente from "./buscarClientes/buscarClientesForm";
import { dinheiroMask } from "@/utils/mascaras";
import CustomSwitch from "../inputsComponents/customSwitch";
import { useRouter } from "next/navigation";

export default function AgendamentoFormComponent({
    context, 
    clientePreSelecionado
}:{
    context: 'visitante' | 'cliente' | 'funcionario'
    clientePreSelecionado?: Usuario;
}){

    const {
        tipo,
        dados,
        valorTotal,
        horarioSelecionado,
        loading,
        semanaAnterior,
        proximaSemana,
        selecionarHorario,
        salvarReservas,
        setTipo,
        removerHorarioSelecionado
    } = useAgenda();

    const horariosOrdenados = useMemo(() => {
        return [...horarioSelecionado].sort((a, b) => 
            new Date(a.horario).getTime() - new Date(b.horario).getTime()
        );
    }, [horarioSelecionado]);

    return (
        <div className="flex flex-col flex-1 h-full min-h-0 w-full items-center p-3 sm:p-4 bg-gray-50/30 overflow-hidden">
            
            <div className="w-full lg:w-[90%] xl:w-[85%] 2xl:max-w-[1600px] flex flex-col h-full min-h-0 gap-3">
                
                <section className="flex flex-col lg:flex-row flex-1 gap-4 min-h-0 overflow-y-auto lg:overflow-hidden pb-4 lg:pb-0">
                    
                    {/* Bloco da Esquerda (Controles + Agenda) */}
                    <div className="flex-1 flex flex-col gap-3 min-h-[450px] lg:min-h-0">
                        
                        <div className="flex flex-row justify-between items-center bg-white p-2 rounded-xl border border-gray-200/60 shadow-sm flex-shrink-0">
                            <SubmitButton 
                                estilo="secundario"
                                onClick={semanaAnterior}
                                className="flex items-center gap-1 !py-1.5 text-xs sm:text-sm"
                            >
                                <ChevronLeft size={16} />
                                <span>Voltar</span>
                            </SubmitButton>

                            <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
                                Escopo Semanal
                            </span>

                            <SubmitButton 
                                estilo="secundario"
                                onClick={proximaSemana}
                                className="flex items-center gap-1 !py-1.5 text-xs sm:text-sm"
                            >
                                <span>Avançar</span>
                                <ChevronRight size={16} />
                            </SubmitButton>
                        </div>

                        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-2 sm:p-4 min-h-0">
                            <Agenda
                                dados={dados}
                                aoSelecionar={selecionarHorario}
                                selecionados={horarioSelecionado}
                                loading={loading}
                            />
                        </div>
                    </div>
                    
                    <div className="flex flex-col w-full lg:w-[320px] xl:w-[360px] bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex-shrink-0 lg:h-full lg:min-h-0">
                        
                        <div className="flex-shrink-0 border-b border-gray-100 pb-3">
                            <CustomSwitch
                                label="Tipo de quadra:"
                                estadoA={{ label: 'Individual', value: 'individual' }}
                                estadoB={{ label: 'Duplas', value: 'duplas' }}
                                name="tipo"
                                selected={tipo}
                                onChange={(valor) => setTipo(valor)}
                            />
                        </div>

                        <div className="flex flex-col pt-3 mb-4 flex-1 min-h-0"> 
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pb-2">
                                Selecionados ({horarioSelecionado.length})
                            </h3>   
                     
                            <div className="h-[150px] lg:h-full lg:min-h-0 overflow-y-auto border border-gray-100 rounded-xl p-2.5 bg-gray-50/60 custom-scrollbar">
                                {/* Centralização total dos slots lá dentro */}
                                <div className="flex flex-wrap gap-1.5 justify-center items-center w-full min-h-full">
                                    {horariosOrdenados.map(r => (
                                        <SelectedSlotButton
                                            key={`${new Date(r.horario).getTime()}-${r.quadra.id_quadra}`}
                                            horario={r.horario}
                                            quadra={r.quadra}
                                            remover={() => removerHorarioSelecionado(r)}
                                        />
                                    ))}
                                    
                                    {horarioSelecionado.length === 0 && (
                                        <p className="text-xs text-gray-400 italic text-center w-full py-4">
                                            Nenhum horário selecionado
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex-none space-y-3 border-t border-gray-100 pt-3">
                            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                <Campo
                                    label="Total:"
                                    valor={dinheiroMask(valorTotal)}
                                />
                            </div>

                            <div className="w-full">
                                <SalvarAgendamentoForm 
                                    contexto={context}
                                    clientePreSelecionado={clientePreSelecionado}
                                    horariosSelecionados={horarioSelecionado}
                                    salvar={salvarReservas}
                                    valorTotal={valorTotal}
                                />
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>
    )
}

interface SelectedSlotButtonProps extends HorarioSelecionado {
    remover?: () => void;
}

function SelectedSlotButton({ horario, quadra, remover }: SelectedSlotButtonProps){
    return (
        <SubmitButton
            estilo="pilula"
            onClick={remover}
            className={`!py-1 !px-2.5 text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm
                ${quadra.tipo === 'duplas' 
                    ? `bg-purple-50! text-purple-700! border-purple-100! hover:bg-purple-100!` 
                    : `bg-blue-50! text-blue-700! border-blue-100! hover:bg-blue-100!`
                }
            `}
        >
            <span className="leading-none font-medium">
                {new Date(horario).toLocaleString('pt-br', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'utc'
                })}
            </span>
            <X size={13} strokeWidth={2.5} className="opacity-70" />
        </SubmitButton>
    )
}

type SalvarAgendamentoFormProps = {
    contexto: "visitante" | "cliente" | "funcionario";
    clientePreSelecionado?: Usuario | null;
    horariosSelecionados: HorarioSelecionado[];
    valorTotal: number;
    salvar: (id: number) => void;
}

function SalvarAgendamentoForm({ contexto, clientePreSelecionado = null, horariosSelecionados, valorTotal, salvar }: SalvarAgendamentoFormProps){
    const router = useRouter();
    const [cliente, setCliente] = useState<Usuario | null>(clientePreSelecionado);
    const [modalOn, setModalOn] = useState<boolean>(false);

    const abrirModal = () => { setModalOn(true) }
    const fecharModal = () => { setModalOn(false); }

    const guardarHorariosMemoria = () => {
        localStorage.setItem('memoria', JSON.stringify(horariosSelecionados));
        router.push(`/login?callback=/perfil/agendar`);
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <SubmitButton
                estilo="primario"
                onClick={abrirModal}
                disabled={horariosSelecionados.length === 0}
                className="w-full py-2.5 font-bold shadow-md tracking-wide"
            >
                <span>Continuar para Reserva</span>
            </SubmitButton>
    
            <CustomModal
                estado={modalOn}
                fechar={fecharModal}
                titulo="Confirmar Reservas"
                width="max-w-md sm:max-w-lg"
                botoes={[
                    { label: 'Cancelar', estilo: 'secundario', onClick: fecharModal },
                    contexto === 'visitante'
                    ? { label: 'Continuar', estilo: 'primario', onClick: guardarHorariosMemoria }
                    : { label: 'Confirmar', estilo: 'primario', onClick: () => salvar(cliente!.id_pessoa), disabled: !cliente }
                ]}
            >
                <div className="space-y-4 my-1 text-left">
                    {contexto === 'visitante' ? ( 
                        <div className="text-center py-2 space-y-2">
                            <h3 className="text-base font-bold text-gray-900">Você está quase lá!</h3>
                            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                                Para garantir a sua reserva, precisamos que você entre na sua conta ou crie uma nova. Seus horários estão salvos!
                            </p>
                        </div>
                    ) : contexto === 'cliente' && cliente ? (
                        <Campo label="Titular da Reserva" valor={cliente.nome} /> 
                    ) : (
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vincular Cliente</label>
                            <BuscarCliente cliente={cliente} onSelecionar={setCliente} />
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resumo do Agendamento</label>
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 max-h-44 overflow-y-auto space-y-2 custom-scrollbar">
                            {horariosSelecionados.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm border-b border-gray-200/60 pb-2 last:border-none last:pb-0">
                                    <div>
                                        <p className="font-semibold text-gray-800">Quadra {item.quadra.id_quadra} ({item.quadra.tipo})</p>
                                        <p className="text-[11px] text-gray-500">
                                            {new Date(item.horario).toLocaleDateString('pt-br', { timeZone: 'utc' })} às {new Date(item.horario).toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit', timeZone: 'utc' })}
                                        </p>
                                    </div>
                                    <span className="font-bold text-gray-700">
                                        {dinheiroMask(item.quadra.valor)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
              
                    <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                        <span className="text-xs sm:text-sm font-semibold text-blue-900">Valor Total</span>
                        <span className="text-base sm:text-lg font-black text-blue-900">
                            {dinheiroMask(valorTotal)}
                        </span>
                    </div>
                </div>
            </CustomModal>
        </div>
    )
}