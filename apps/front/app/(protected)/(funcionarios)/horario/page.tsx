'use client'

import CustomModal from "@/components/customModal";
import useHorario from "./useHorario";
import { AlertCircle, CalendarDays, CalendarOff, Clock, Plus, Save, Trash2 } from "lucide-react";
import SubmitButton from "@/components/buttonComponents/submitButton";
import CustomInput from "@/components/inputsComponents/customInput";

export default function HorarioPage(){

    const {
        loading,
        horario,
        bloqueios,
        handleChange,
        salvarHorario,
        salvarBloqueio,
        removerBloqueio,
        toggleModal,
        handleChangeBloqueio,
        formData,
        modalBloqueio
    } = useHorario();

    const semanaHeader = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    if(!horario) return <p className="p-8 text-center text-sm text-gray-500">Erro ao renderizar página</p>
    
    const hoje = new Date();
    hoje.setHours(0,0,0,0);

    return (
        <section className="w-full h-screen bg-gray-50/50 overflow-y-auto flex flex-col">
            <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px] p-4 sm:p-6 lg:p-8 flex flex-col gap-8">
                
                <div className="flex flex-col gap-4">

                    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shadow-sm border border-blue-100">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Horários de Funcionamento</h2>
                                <p className="text-xs text-gray-500">Defina os dias e as janelas de horários ativos no sistema</p>
                            </div>
                        </div>
                        
                        <SubmitButton
                            estilo="primario"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 font-semibold text-sm shadow-sm transition-all sm:w-fit"
                            onClick={salvarHorario}
                        >
                            <Save size={16} />
                            <span>Salvar Configurações</span>
                        </SubmitButton>
                    </header>

                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7">
                        {horario.map((h) => (
                            <div
                                key={h.id_horario}
                                className={`relative border rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-sm min-h-[140px] ${
                                    h.ativo 
                                    ? "bg-white border-blue-100 ring-1 ring-blue-50/50" 
                                    : "bg-gray-50 border-gray-200 opacity-60"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">
                                        {semanaHeader[h.dia_semana]}
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={h.ativo}
                                            onChange={(e) => handleChange(h.id_horario, 'ativo', e.target.checked)}
                                        />
                                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {h.ativo ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Início</p>
                                                <input
                                                    type="time"
                                                    defaultValue={h.horario_abertura}
                                                    onBlur={(e) => handleChange(h.id_horario, 'horario_abertura', e.target.value)}
                                                    className="w-full text-center border border-gray-200 rounded-lg p-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Fim</p>
                                                <input
                                                    type="time"
                                                    defaultValue={h.horario_fechamento}
                                                    onBlur={(e) => handleChange(h.id_horario, 'horario_fechamento', e.target.value)}
                                                    className="w-full text-center border border-gray-200 rounded-lg p-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-[52px] flex items-center justify-center border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                                        <span className="text-xs text-gray-400 font-medium italic">Fechado</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-red-50 text-red-500 rounded-xl shadow-sm border border-red-100">
                                <CalendarOff size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight lg:text-2xl">Bloqueios de Datas</h2>
                                <p className="text-xs text-gray-500">Gerencie recessos, manutenções e indisponibilidades gerais</p>
                            </div>
                        </div>
                        
                        <SubmitButton
                            estilo="primario"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 font-semibold text-sm shadow-sm transition-all sm:w-fit"
                            onClick={toggleModal}
                        >
                            <Plus size={16} />
                            <span>Novo Bloqueio</span>
                        </SubmitButton>
                    </header>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed sm:table-auto">
                                <thead className="bg-gray-50/75">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-1/3">Motivo</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Período de Bloqueio</th>
                                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wider w-24">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {bloqueios.length > 0 ? bloqueios.map((b) => (
                                        <tr key={b.id_bloqueio} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-red-50 text-red-600 rounded-lg flex-shrink-0">
                                                        <AlertCircle size={16} />
                                                    </div>
                                                    <span className="font-semibold text-sm text-gray-700 truncate">{b.motivo}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                                                    <CalendarDays size={14} className="text-gray-400 flex-shrink-0" />
                                                    <span className="font-mono bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-gray-700">
                                                        {new Date(b.inicio_bloqueio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone:"utc" })}
                                                    </span>
                                                    <span className="text-gray-300">até</span>
                                                    <span className="font-mono bg-gray-50 border border-gray-100 px-2 py-0.5 rounded text-gray-700">
                                                        {new Date(b.fim_bloqueio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone:"utc" })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <SubmitButton
                                                    onClick={() => removerBloqueio(b.id_bloqueio)}
                                                    estilo="perigo"
                                                    className="inline-flex h-8 w-8 items-center justify-center p-0 rounded-lg border border-transparent shadow-none hover:bg-red-50 hover:text-red-600! text-red-600! transition-all mx-auto"
                                                >
                                                    <Trash2 size={16} />
                                                </SubmitButton>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-2 text-gray-400 max-w-sm mx-auto">
                                                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 mb-2">
                                                        <CalendarDays size={32} strokeWidth={1.5} className="text-gray-400" />
                                                    </div>
                                                    <p className="font-bold text-gray-700 text-base">Nenhum bloqueio programado</p>
                                                    <p className="text-xs text-gray-400 leading-relaxed">O complexo esportivo está operando normalmente sem exceções ou interrupções de calendário.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <CustomModal
                titulo="Impedir Agendamentos"
                estado={modalBloqueio}
                fechar={toggleModal}
                width="max-w-xl w-full"
                botoes={[
                    {
                        label: 'Cancelar',
                        disabled: loading,
                        estilo: 'secundario',
                        isLoading: loading,
                        onClick: toggleModal
                    },
                    {
                        label: 'Confirmar Bloqueio',
                        disabled: loading,
                        estilo: 'primario',
                        isLoading: loading,
                        onClick: salvarBloqueio
                    }
                ]}
            >
                <div className="space-y-5">
                    
                    <p className="text-xs text-gray-500">Nenhum cliente conseguirá reservar horários que sobreponham este intervalo.</p>
                    

                    <div className="space-y-4">
                        <CustomInput
                            name="motivo"
                            label="Motivo do bloqueio"
                            placeholder="Ex: Manutenção preventiva dos refletores"
                            value={formData.motivo}
                            onChange={handleChangeBloqueio}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    Início do Bloqueio
                                </label>
                                <input
                                    type="datetime-local"
                                    name="inicio_bloqueio"
                                    value={formData.inicio_bloqueio}
                                    onChange={handleChangeBloqueio}
                                    min={hoje.toISOString().slice(0, 16)}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all text-sm text-gray-700 font-medium"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    Fim do Bloqueio
                                </label>
                                <input
                                    type="datetime-local"
                                    name="fim_bloqueio"
                                    value={formData.fim_bloqueio}
                                    onChange={handleChangeBloqueio}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-all text-sm text-gray-700 font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CustomModal>
        </section>
    );
}