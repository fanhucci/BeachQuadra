'use client'

import SubmitButton from "@/components/buttonComponents/submitButton";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { NovaReserva, Usuario } from "@app/shared";
import Agenda from "../agenda";
import useAgenda, { HorarioSelecionado } from "./useAgenda";
import CustomModal from "../customModal";
import Campo from "../inputsComponents/campo";
import CustomSwitch from "../inputsComponents/customSwitch";
import BuscarCliente from "./buscarClientes/buscarClientesForm";
import { dinheiroMask } from "@/utils/mascaras";

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
                    />
                    <div className="flex flex-col w-[30%]">
                        <div className="flex-1 flex-wrap">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider pb-4">
                                Selecionados ({horarioSelecionado.length})
                            </h3>
                            
                            <div className="flex flex-wrap justify-center gap-2">
                                {horariosOrdenados.map(r => (
                                    <SelectedSlotButton
                                        key={r.horario.toString()}
                                        horario={r.horario}
                                        quadra={r.quadra}
                                        remover={() => removerHorarioSelecionado(r)}
                                    />
                                ))}
                                
                                {horarioSelecionado.length === 0 && (
                                    <p className="text-sm text-gray-400 italic">Nenhum horário selecionado</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-1/3 items-center">
                            <CustomSwitch
                                label="Tipo de quadra:"
                                estadoA={{label:'Individual', value:'individual'}}
                                estadoB={{label:'Duplas', value:'duplas'}}
                                name="tipo"
                                selected={tipo}
                                onChange={(valor)=>setTipo(valor)}
                            />
                            <Campo
                                label="Total:"
                                valor={dinheiroMask(valorTotal)}
                            />
                            <SalvarAgendamentoForm 
                                contexto={context}
                                clientePreSelecionado={clientePreSelecionado}
                                horariosSelecionados={horarioSelecionado}
                                salvar={salvarReservas}
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
            className={quadra.tipo === 'duplas'? `!bg-purple-50 !text-purple-600 !border-purple-100 !hover:bg-purple-100` : ``}
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
    salvar:()=>void;
}

function SalvarAgendamentoForm({
    contexto,
    clientePreSelecionado = null,
    horariosSelecionados,
    salvar,
}:SalvarAgendamentoFormProps){

    const [cliente,setCliente] = useState<Usuario | null>(clientePreSelecionado);

    const [modalOn,setModalOn] = useState<boolean>(false);

    const abrirModal = ()=>{
        setModalOn(true)
    }
    const fecharModal = ()=>{
        setModalOn(false);
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
                        label:'Confirmar',
                        estilo:'primario',
                        href:'/login'
                    }
                    :{
                        label:'Confirmar',
                        estilo:'primario',
                        onClick:salvar,
                        disabled:!cliente? true : false,
                    }
                ]}
            >
                {
                    contexto === 'visitante'
                    ?(
                        <>
                            aguarde
                        </>
                    )
                    
                    :contexto === 'cliente' && cliente 
                    ?(
                        <>
                            <Campo
                                label="Cliente"
                                valor={cliente.nome}
                            />
                        </>
                    )
                    : (
                        <>
                            <BuscarCliente
                                cliente={cliente}
                                onSelecionar={setCliente}
                            />
                        </>)
                }

            </CustomModal>
        </div>
    )
}