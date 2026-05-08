'use client'
import CustomButtom from "@/components/customButton";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import useHorario from "./useHorario";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AlertCircle, CalendarDays, CalendarOff, Clock, Plus, Save, Trash2 } from "lucide-react";

export default function HorarioPage(){

    // const [horario,setHorario] = useState([]);

    // const handleMudarCampo = (index, campo, valor) => {
    //     setHorario(prev => {
    //         const novoArray = [...prev];
    //         novoArray[index] = { ...novoArray[index], [campo]: valor };
    //         return novoArray;
    //     });
    // };

    // useEffect(()=>{
    //     listarHorario();
    // },[])

    // async function listarHorario(){
    //     try {
    //         const data = await apiRequest("/horario");
    //         console.log(JSON.stringify(data))
    //         setHorario(data.horario);  
    //     } catch (error) {
            
    //     }
    // }

    // async function salvarHorario() {
    //     try {
    //         const resultado = await apiRequest("/horario",{
    //             method:"PUT",
    //             body:JSON.stringify(horario)
    //         });
    //         toast.success("Novo horário salvo");
    //     } catch (error) {
            
    //     }
    // }

    const {loading, horario, bloqueios, handleChange, salvarHorario} = useHorario();

    const semanaHeder = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

    if(loading) return <LoadingSpinner/>

    if(!horario) return <p>Erro ao renderizar pagina</p>

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
                                onChange={(e) => handleChange(e)}
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
                                        value={h.horario_abertura}
                                        onChange={(e) => handleChange(e)}
                                        className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div className="mt-5 text-gray-300">—</div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Fim</p>
                                    <input
                                        type="time"
                                        value={h.horario_fechamento}
                                        onChange={(e) => handleChange(e)}
                                        className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md shadow-blue-200"
            >
                <Save size={18} />
                Salvar Configurações
            </button>
        </section>


        <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                <div className="flex items-center gap-2">
                    <CalendarOff className="text-red-500" size={28} />
                    <h2 className="text-2xl font-bold text-gray-800">Bloqueios de Datas</h2>
                </div>

                <button className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-2 rounded-xl transition-all">
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
                                            {new Date(b.inicio_bloqueio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                        <span className="text-gray-300">|</span>
                                        <span className="font-mono">
                                            {new Date(b.fim_bloqueio).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
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
        </div>
    );
}