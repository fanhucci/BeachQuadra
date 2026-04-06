'use client'

import CustomButtom from "@/components/customButton";
import CustomModal from "@/components/customModal";
import CustomSwitch from "@/components/customSwitch";
import CustomTable from "@/components/customTable";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import {QuadraDTO,} from "../../../shared/schemas/quadraSchema";

export default function QuadrasPage(){
    const estadoInicial = {
        id_quadra:null,
        nome:"",
        tipo:"individual",
        status:"ativa",
        valor:""
    }

    const [modalAberta,setModalAberta] = useState(false);
    const [quadras,setQuadras] = useState([]);
    const [formData,setFormData] = useState(estadoInicial);

    const handleChange = (e) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }

    useEffect(()=>{
        listarQuadras()
    },[])

    useEffect(()=>{
        if(!modalAberta){
            setFormData(estadoInicial);
        }
    },[modalAberta])


    async function listarQuadras(){
        try {
            const data = await apiRequest("/quadras");
            const tabela = data.map((quadra:QuadraDTO)=>({
                    ...quadra,
                    "ações":(
                        <div className="inline-flex justify-center gap-2">
                            <CustomButtom funcao={()=>abrirEdicao(quadra)} texto="editar" tipo="secundario" />
                            <CustomButtom funcao={()=>excluirQuadra(quadra.id_quadra)} texto="excluir" tipo="danger" />
                        </div>
                    )
                }));
            setQuadras(tabela);
                    
        } catch (error) {
            alert(error);
        }
    }

    function abrirEdicao(quadra){
        setFormData(quadra);
        setModalAberta(true);
    }
    
    async function salvarQuadra() {
        try {
            const resposta = await apiRequest(formData.id_quadra? `/quadras/${formData.id_quadra}`: "/quadras", {
                method: formData.id_quadra? "PUT":"POST",
                body:JSON.stringify(formData)
            })

            setModalAberta(false);
            listarQuadras();

        } catch (error) {
            
        }
    }

    async function excluirQuadra(id:number) {
        try {
            const resposta = await apiRequest(`/quadras/${id}`, {method:"DELETE"})
            listarQuadras();
        } catch (error) {
            
        }
    }
    


    return(
        <div className="flex flex-col flex-1">
            <div className="flex w-full flex-row gap-1 p-2 ">
                <input className="flex-1" type="text" placeholder="Pesquisar..." />
                <CustomButtom funcao={()=>alert("pesquisa")} texto="pesquisar" tipo="secundario" />
                <CustomButtom funcao={()=>setModalAberta(true)} texto="Nova quadra" tipo="terciario"/>
            </div>
            
            <CustomModal aberta={modalAberta} fechar={() => setModalAberta(false)}>
                <div className="flex flex-col w-80 p-6 gap-4">
                                
                    <div className="flex flex-col">
                        <label htmlFor="nome" className="text-gray-700  mb-1">Nome:</label>
                        <input id="nome" value={formData.nome} onChange={handleChange} 
                            className=" border rounded-xl h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <CustomSwitch 
                        estadoA={{label: 'Individual', value:'individual'}} 
                        estadoB={{label:'Duplas', value:'dupla'}} 
                        name="tipo" 
                        onChange={(valor) => handleChange({ target: { id: 'tipo', value: valor } } as any)} 
                        selected={formData.tipo}
                    />

                    <CustomSwitch 
                        estadoA={{label: 'Ativa', value:'ativa'}} 
                        estadoB={{label:'Inativa', value:'inativa'}} 
                        name="status" 
                        onChange={(valor) => handleChange({ target: { id: 'status', value: valor } } as any)} 
                        selected={formData.status}
                    />
                    
            
                    <div className="flex flex-col">
                        <label htmlFor="valor" className="text-gray-700  mb-1">Valor:</label>
                        <input id="valor" value={formData.valor} onChange={handleChange} 
                            className="border rounded-xl h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
            
                    <div className="flex justify-center gap-2">
                        <CustomButtom funcao={()=>setModalAberta(false)} texto={"cancelar"} tipo="danger"/>
                        <CustomButtom funcao={salvarQuadra} texto={"salvar"} tipo="terciario"/>
                    </div>
            
                </div>
            </CustomModal>

            {
                quadras.length>0? 
                    <CustomTable tableContent={quadras}/>
                :
                <p>Nenhuma quadra cadastrada</p>
            }

        </div>
    )
}