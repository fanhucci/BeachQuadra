'use client'
import CustomButtom from "@/components/customButton";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function HorarioPage(){

    const [horario,setHorario] = useState([]);

    const handleMudarCampo = (index, campo, valor) => {
        setHorario(prev => {
            const novoArray = [...prev];
            novoArray[index] = { ...novoArray[index], [campo]: valor };
            return novoArray;
        });
    };

    useEffect(()=>{
        listarHorario();
    },[])

    async function listarHorario(){
        try {
            const data = await apiRequest("/horario");
            setHorario(data);  
        } catch (error) {
            
        }
    }

    async function salvarHorario() {
        try {
            const resultado = await apiRequest("/horario",{
                method:"PUT",
                body:JSON.stringify(horario)
            });
            toast.success("Novo horário salvo");
        } catch (error) {
            
        }
    }


    return (
        <div className="p-10">
            {horario.length > 0 ? (
                <div className="max-w-6xl mx-auto space-y-6">

                <h2 className="text-2xl font-semibold text-gray-800">
                    Configuração de Horários
                </h2>

                <div className="border rounded-2xl shadow-sm overflow-hidden">

                    <div className="grid grid-cols-[120px_repeat(7,1fr)] bg-gray-100 text-gray-700 font-semibold text-sm">
                    <div className="p-4 border-r">Horário</div>
                    {horario.map(h => (
                        <div key={h.id_horario} className="p-4 border-r text-center">
                        {h.dia_semana}
                        </div>
                    ))}
                    </div>


                    <div className="grid grid-cols-[120px_repeat(7,1fr)] border-t">
                    <div className="p-4 bg-gray-50 border-r font-medium text-gray-600">
                        Abre
                    </div>
                    {horario.map((h, index) => (
                        <div key={h.id_horario} className="p-3 border-r">
                        <input
                            type="time"
                            value={h.horario_abertura}
                            onChange={(e) =>
                            handleMudarCampo(index, 'horario_abertura', e.target.value)
                            }
                            className="w-full border rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        </div>
                    ))}
                    </div>

                    <div className="grid grid-cols-[120px_repeat(7,1fr)] border-t">
                    <div className="p-4 bg-gray-50 border-r font-medium text-gray-600">
                        Fecha
                    </div>
                    {horario.map((h, index) => (
                        <div key={h.id_horario} className="p-3 border-r">
                        <input
                            type="time"
                            value={h.horario_fechamento}
                            onChange={(e) =>
                            handleMudarCampo(index, 'horario_fechamento', e.target.value)
                            }
                            className="w-full border rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                        </div>
                    ))}
                    </div>

    
                    <div className="grid grid-cols-[120px_repeat(7,1fr)] border-t">
                    <div className="p-4 bg-gray-50 border-r font-medium text-gray-600">
                        Ativo
                    </div>
                    {horario.map((h, index) => (
                        <div key={h.id_horario} className="p-3 border-r flex justify-center items-center">
                        <input
                            type="checkbox"
                            checked={h.ativo}
                            onChange={(e) =>
                            handleMudarCampo(index, 'ativo', e.target.checked)
                            }
                            className="w-5 h-5 accent-blue-600"
                        />
                        </div>
                    ))}
                    </div>

                </div>

                <div className="flex justify-end">
                    <CustomButtom
                    funcao={salvarHorario}
                    texto="Salvar alterações"
                    tipo="secundario"
                    />
                </div>

                </div>
            ) : (
                <p className="text-center text-gray-500">Carregando...</p>
            )}
        </div>
    )
}