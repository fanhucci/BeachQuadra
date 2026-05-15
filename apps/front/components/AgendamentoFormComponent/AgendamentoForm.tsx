'use client'

import SubmitButton from "@/components/buttonComponents/submitButton";
import { X } from "lucide-react";
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
    context:'visitante'|'cliente'|'funcionario'
    clientePreSelecionado?:Usuario;
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

    return(
        <div className="flex flex-col flex-1 h-full items-center">
            <div className="w-[80%] justify">
                <div className="flex flex-row justify-between p-2">
                    <SubmitButton 
                        estilo="secundario"
                        onClick={semanaAnterior}
                    >
                        Voltar
                    </SubmitButton>

                    <SubmitButton 
                        estilo="secundario"
                        onClick={proximaSemana}
                    >
                        Avançar
                    </SubmitButton>
                </div>
                <section className="flex flex-row flex-1 gap-4">
                    <Agenda
                        dados={dados}
                        aoSelecionar={selecionarHorario}
                        selecionados={horarioSelecionado}
                        loading={loading}
                    />
                   <div className="flex flex-col w-[30%] h-full">
                        <CustomSwitch
                            label="Tipo de quadra:"
                            estadoA={{label:'Individual', value:'individual'}}
                            estadoB={{label:'Duplas', value:'duplas'}}
                            name="tipo"
                            selected={tipo}
                            onChange={(valor)=>setTipo(valor)}
                        />

                        <div className="flex-1 h-[80%] min-h-0 flex flex-col pt-2 mb-4"> 
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider pb-4">
                                Selecionados ({horarioSelecionado.length})
                            </h3>   
                     
                            <div className="h-[600px] overflow-y-auto border rounded-xl p-3 bg-gray-50">
                                <div className="flex flex-wrap justify-center gap-2">
                                    {horariosOrdenados.map(r => (
                                        <SelectedSlotButton
                                            key={`${new Date(r.horario).getTime()}-${r.quadra.id_quadra}`}
                                            horario={r.horario}
                                            quadra={r.quadra}
                                            remover={() => removerHorarioSelecionado(r)}
                                        />
                                    ))}
                                    
                                    {horarioSelecionado.length === 0 && (
                                        <p className="text-sm text-gray-400 italic text-center mt-4">
                                            Nenhum horário selecionado
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex-none pt-4 bg-white space-y-4">
                            
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <Campo
                                    label="Total:"
                                    valor={dinheiroMask(valorTotal)}
                                />
                            </div>

                            <SalvarAgendamentoForm 
                                contexto={context}
                                clientePreSelecionado={clientePreSelecionado}
                                horariosSelecionados={horarioSelecionado}
                                salvar={salvarReservas}
                                valorTotal={valorTotal}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

interface SelectedSlotButtonProps extends HorarioSelecionado {
    remover?:()=>void;
}

function SelectedSlotButton({
    horario,
    quadra,
    remover
}:SelectedSlotButtonProps){
    return(
        <SubmitButton
            estilo="pilula"
            onClick={remover}
            className={quadra.tipo === 'duplas'? `bg-purple-50! text-purple-600! border-purple-100! hover:bg-purple-100!` : ``}
        >
            <span className="leading-none">
                {new Date(horario).toLocaleString('pt-br', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'utc'
                })}
            </span>
            <X size={12} strokeWidth={3} />
        </SubmitButton>
    )
   
}

type SalvarAgendamentoFormProps = {
    contexto: "visitante" | "cliente" | "funcionario";
    clientePreSelecionado?:Usuario | null;
    horariosSelecionados:HorarioSelecionado[];
    valorTotal:number;
    salvar:(id:number)=>void;
}

function SalvarAgendamentoForm({
    contexto,
    clientePreSelecionado = null,
    horariosSelecionados,
    valorTotal,
    salvar,
}:SalvarAgendamentoFormProps){

    const router = useRouter();

    const [cliente,setCliente] = useState<Usuario | null>(clientePreSelecionado);
    const [modalOn,setModalOn] = useState<boolean>(false);

    const abrirModal = ()=>{
        setModalOn(true)
    }
    const fecharModal = ()=>{
        setModalOn(false);
    }

    const guardarHorariosMemoria = ()=>{
        localStorage.setItem('memoria',JSON.stringify(horariosSelecionados));

        router.push(`/login?callback=/perfil/agendar`);
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <>

                    <SubmitButton
                        estilo="primario"
                        onClick={abrirModal}
                        disabled={horariosSelecionados.length === 0}
                    >
                        <span>Continuar</span>
                    </SubmitButton>
            </>
    
            <CustomModal
                size="2xl"
                estado={modalOn}
                fechar={fecharModal}
                titulo="teste"
                botoes={[
                    {
                        label:'Cancelar',
                        estilo:'secundario',
                        onClick:fecharModal
                    },
                    contexto === 'visitante'
                    ?{
                        label:'Continuar',
                        estilo:'primario',
                        onClick:guardarHorariosMemoria
                    }
                    :{
                        label:'Confirmar',
                        estilo:'primario',
                        onClick:()=>salvar(cliente!.id_pessoa),
                        disabled:!cliente? true : false,
                    }
                ]}
            >
                {
                    contexto === 'visitante'
                    ?(
                        <>
                            <div className="text-center py-4 space-y-3">
                
                                <h3 className="text-lg font-medium text-gray-900">Você está quase lá!</h3>
                                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                                    Para garantir a sua reserva, precisamos que você entre na sua conta ou crie uma nova. Seus horários estão salvos!
                                </p>
                            </div>

          
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Horários selecionados</span>
                                <div className="max-h-28 overflow-y-auto space-y-2 pr-1">
                                    {horariosSelecionados.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-sm text-gray-700 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                                            <span className="font-medium text-gray-800">{item.quadra.tipo === 'individual' ? '🎾 Quadra Individual' : '👥 Quadra Duplas'}</span>
                                            <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-2 py-1 rounded">
                                                {new Date(item.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )
                    
                    :contexto === 'cliente' && cliente 
                    ?(
                       <>
                            <div className="space-y-4">
     
                                <Campo
                                    label="Titular da Reserva"
                                    valor={cliente.nome}
                                />

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resumo do Agendamento</label>
                                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 max-h-40 overflow-y-auto space-y-2">
                                        {horariosSelecionados.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-2 last:border-none last:pb-0">
                                                <div>
                                                    <p className="font-medium text-gray-800">Quadra {item.quadra.id_quadra} ({item.quadra.tipo})</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(item.horario).toLocaleDateString()} às {new Date(item.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                <span className="font-semibold text-gray-700">
                                                    {item.quadra.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

          
                                <div className="flex justify-between items-center bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                                    <span className="text-sm font-medium text-indigo-900">Valor Total</span>
                                    <span className="text-lg font-bold text-indigo-700">
                                        {valorTotal}
                                    </span>
                                </div>
                            </div>
                        </>
                    )
                    : (
                        <>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Vincular Cliente</label>
                                    <BuscarCliente
                                        cliente={cliente}
                                        onSelecionar={setCliente}
                                    />
                                </div>

                       
                                {cliente && (
                                    <div className="space-y-3 pt-2 border-t border-gray-100 animate-fadeIn">
                                        <div className="bg-gray-50 rounded-xl p-3 max-h-32 overflow-y-auto space-y-2">
                                            {horariosSelecionados.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-xs text-gray-600">
                                                    <span>Quadra {item.quadra.id_quadra} - {new Date(item.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    <span className="font-medium">{item.quadra.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center text-sm font-medium text-gray-700 px-1">
                                            <span>Total da Reserva:</span>
                                            <span className="font-bold text-gray-900">
                                                {valorTotal}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )
                }

            </CustomModal>
        </div>
    )
}