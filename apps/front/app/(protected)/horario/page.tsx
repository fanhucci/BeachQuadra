'use client'


import CustomModal from "@/components/customModal";
import useHorario from "./useHorario";

import { AlertCircle, CalendarDays, CalendarOff, Clock, Plus, Save, Trash2 } from "lucide-react";


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

    const semanaHeder = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];


    if(!horario) return <p>Erro ao renderizar pagina</p>
    const hoje = new Date();
    hoje.setHours(0,0,0,0)

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-12">
        
            <section className="space-y-6">

                <div className="flex items-center gap-2 border-b pb-4">
                    <Clock className="text-blue-600" size={28} />
                    <h2 className="text-2xl font-bold text-gray-800">Horários de Funcionamento</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                    {horario.map((h) => (
                        <div
                        key={h.id_horario}
                        className={`relative border rounded-2xl p-5 transition-all duration-200 shadow-sm ${
                            h.ativo 
                            ? "bg-white border-blue-100 ring-1 ring-blue-50" 
                            : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                        >
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">
                                {semanaHeder[h.dia_semana]}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={h.ativo}
                                    onChange={(e) => handleChange(h.id_horario, 'ativo', e.target.checked)}
                                />
                                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600">   
                                </div>
                            </label>
                        </div>

                        {h.ativo ? (
                            <div className="space-y-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Inicio</p>
                                        <input
                                            type="time"
                                            defaultValue={h.horario_abertura}
                                            onBlur={(e) => handleChange(h.id_horario, 'horario_abertura', e.target.value)}
                                            className="w-full text-center border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Fim</p>
                                        <input
                                            type="time"
                                            defaultValue={h.horario_fechamento}
                                            onBlur={(e) => handleChange(h.id_horario, 'horario_fechamento', e.target.value)}
                                            className="w-full text-center border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[68px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                                <span className="text-sm text-gray-400 font-medium italic">Fechado</span>
                            </div>
                        )}
                        </div>
                    ))}
                </div>

                <button 
                    onClick={salvarHorario}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-blue-200"
                >
                    <Save size={18} />
                    "Salvar Configurações"
                </button>
            </section>


            <section className="space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                    <div className="flex items-center gap-2">
                        <CalendarOff className="text-red-500" size={28} />
                        <h2 className="text-2xl font-bold text-gray-800">Bloqueios de Datas</h2>
                    </div>

                    <button className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-2 rounded-xl transition-all"
                        onClick={toggleModal}
                    >
                        <Plus size={18} />
                        Novo Bloqueio
                    </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Motivo</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Período de Bloqueio</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {bloqueios.length > 0 ? bloqueios.map((b) => (
                                <tr key={b.id_bloqueio} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                                <AlertCircle size={16} />
                                            </div>
                                            <span className="font-semibold text-gray-700">{b.motivo}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <CalendarDays size={14} className="text-gray-400" />
                                            <span className="font-mono">
                                                {new Date(b.inicio_bloqueio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone:"utc" })}
                                            </span>
                                            <span className="text-gray-300">|</span>
                                            <span className="font-mono">
                                                {new Date(b.fim_bloqueio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short', timeZone:"utc" })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={()=>removerBloqueio(b.id_bloqueio)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-2 text-gray-400">
                                            <CalendarDays size={40} strokeWidth={1} />
                                            <p className="font-medium text-lg">Nenhum bloqueio programado</p>
                                            <p className="text-sm">Clique em "Novo Bloqueio" para adicionar exceções.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <CustomModal
                titulo="Bloquear"
                estado={modalBloqueio}
                fechar={toggleModal}
            >
                <div className="space-y-6">
  
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">Novo Bloqueio</h3>
                        <p className="text-sm text-gray-500">Impeça novos agendamentos em um período específico.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Motivo do Bloqueio
                            </label>
                            <input
                            type="text"
                            name="motivo"
                            value={formData.motivo}
                            onChange={handleChangeBloqueio}
                            placeholder="Ex: Manutenção, Feriado, Torneio..."
                            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Início do Bloqueio
                                </label>
                                <input
                                    type="datetime-local"
                                    name="inicio_bloqueio"
                                    value={formData.inicio_bloqueio}
                                    onChange={handleChangeBloqueio}
                                    min={hoje.toISOString().slice(0, 16)}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    Fim do Bloqueio
                                </label>
                                <input
                                    type="datetime-local"
                                    name="fim_bloqueio"
                                    value={formData.fim_bloqueio}
                                    onChange={handleChangeBloqueio}
                                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-red-500 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            onClick={toggleModal}
                            className="flex-1 px-4 py-3 font-semibold text-gray-500 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={salvarBloqueio}
                            disabled={loading}
                            className="flex-1 px-4 py-3 font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-100 disabled:opacity-50"
                        >
                            Bloquear
                        </button>
                    </div>
                </div>
            </CustomModal>
        </div>
    );
}

