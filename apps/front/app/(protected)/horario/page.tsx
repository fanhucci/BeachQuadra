'use client'
import CustomButtom from "@/components/customButton";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import useHorario from "./useHorario";
import LoadingSpinner from "@/components/LoadingSpinner";

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

    if(!horario || !bloqueios) return <p>Erro ao renderizar pagina</p>

    return (
        <div className="p-6 space-y-10">

       
            <section className="space-y-6">
                <h2 className="text-2xl font-semibold">Horários de Funcionamento</h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {horario.map(h => (
                        <div
                            key={h.id_horario}
                            className="border rounded-xl p-4 shadow-sm space-y-3 bg-white"
                            >
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-lg">
                                    {dias[h.dia_semana]}
                                </h3>

                                <input
                                    type="checkbox"
                                    checked={h.ativo}
                                    onChange={handleChange}
                                />
                            </div>

                            {h.ativo && (
                                <div className="flex gap-2 items-center">
                                <input
                                    type="time"
                                    value={h.horario_abertura}
                                    onChange={handleChange}
                                    className="border rounded p-2 w-full"
                                />

                                <span>até</span>

                                <input
                                    type="time"
                                    value={h.horario_fechamento}
                                    onChange={handleChange}
                                    className="border rounded p-2 w-full"
                                />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button className="bg-blue-600 text-white px-5 py-2 rounded-md">
                    Salvar Horários
                </button>
            </section>

     
            <section className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">Bloqueios de Datas</h2>

                    <button className="bg-red-600 text-white px-4 py-2 rounded-md">
                        Novo Bloqueio
                    </button>
                </div>

                <div className="overflow-auto border rounded-xl">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3">Motivo</th>
                                <th className="p-3">Início</th>
                                <th className="p-3">Fim</th>
                                <th className="p-3 text-center">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bloqueios.map(b => (
                                <tr key={b.id_bloqueio} className="border-t">
                                    <td className="p-3">{b.motivo}</td>
                                    <td className="p-3">
                                        {new Date(b.inicio_bloqueio).toLocaleString()}
                                    </td>
                                    <td className="p-3">
                                        {new Date(b.fim_bloqueio).toLocaleString()}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button className="text-red-600">
                                        Remover
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {bloqueios.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        Nenhum bloqueio cadastrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}