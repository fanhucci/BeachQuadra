'use client'
import CustomButtom from "@/components/customButton";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"

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
        console.log(horario)
        try {
            const resultado = await apiRequest("/horario",{
                method:"PUT",
                body:JSON.stringify(horario)
            });
            alert("Novo horário salvo")
        } catch (error) {
            
        }
    }


    return (
        <div className="p-10 text-center relative">
            {
                horario.length>0?
                <div className="flex flex-col gap-2">

                    <div className="w-full border rounded-xl overflow-hidden shadow-sm">
                        
        
                        <div className="grid grid-cols-[100px_repeat(7,1fr)] bg-gray-100 border-b font-bold text-gray-700">
                            <div className="p-3 border-r">Horário</div>
                            {horario.map(h=>(
                                <div key={h.id_horario} className="p-3 border-r">{h.dia_semana}</div>
                            ))}
                        </div>

            
                        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b last:border-0 hover:bg-gray-50">

                            <div className="p-3 bg-gray-50 font-medium border-r">Abre</div>
                            
                
                            {
                                horario.map((h,index)=>(
                                    <div key={h.id_horario} className="p-3 flex justify-center border-r"><input className="w-full text-center bg-transparent focus:outline-none" type="text" value={h.horario_abertura} 
                                    onChange={(e) => handleMudarCampo(index, 'horario_abertura', e.target.value)}
                                    /></div>
                                ))
                            }
                
                        </div>

                        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b last:border-0 hover:bg-gray-50">
                
                            <div className="p-3 bg-gray-50 font-medium border-r">Fecha</div>
                            
            
                            {
                                horario.map((h,index)=>(
                                    <div key={h.id_horario} className="p-3 flex justify-center border-r"><input className="w-full text-center bg-transparent focus:outline-none" type="text" value={h.horario_fechamento} 
                                    onChange={(e) => handleMudarCampo(index, 'horario_fechamento', e.target.value)}
                                    /></div>
                                ))
                            }
                
                        </div>

                        <div className="grid grid-cols-[100px_repeat(7,1fr)] border-b last:border-0 hover:bg-gray-50">
                    
                            <div className="p-3 bg-gray-50 font-medium border-r">Ativo</div>
                            
                
                            {
                                horario.map((h,index)=>(
                                    <div key={h.id_horario} className="p-3 flex justify-center border-r"><input type="checkbox" checked={h.ativo}
                                    onChange={(e) => handleMudarCampo(index, 'ativo', e.target.checked)}
                                    /></div>
                                ))
                            }
                
                        </div>
                        
                    </div>
                    <div className="absolute right-10 bottom-0">
                        <CustomButtom funcao={salvarHorario} texto="Salvar" tipo="secundario"/>
                    </div>
                </div>
                    
                :
                <p>Carregando...</p>
            }

        </div>
    )
}