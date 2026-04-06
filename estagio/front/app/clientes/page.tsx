'use client'
import CustomButtom from "@/components/customButton";
import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import {ClienteDTO, EditarClienteDTO} from "../../../shared/schemas/clienteSchema";

export default function ClientesPage(){
    const estadoInicial = {
        id_cliente:null,
        nome:"",
        cpf:"",
        telefone:"",
        usuario:null
    }

    const [modalAberta,setModalAberta] = useState(false);
    const [clientes,setClientes] = useState([]);
    const [formData,setFormData] = useState(estadoInicial);

    const handleChange = (e) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }

    useEffect(()=>{
        listarClientes();
    },[]);

    useEffect(()=>{
        if(!modalAberta){
            setFormData(estadoInicial);
        }
    },[modalAberta])

    async function listarClientes(){
        try {
            const data = await apiRequest("/clientes");
            const tabela = data.map((cliente:ClienteDTO)=>({
            ...cliente,
            "ações":(
                <div className="inline-flex justify-center gap-2">
                    <CustomButtom funcao={()=>abrirEdicao(cliente)} texto="editar" tipo="secundario" />
                    <CustomButtom funcao={()=>excluirCliente(cliente.id_cliente)} texto="excluir" tipo="danger" />
                </div>
            )
        }));
            setClientes(tabela);
            
        } catch (error) {
            alert(error);
        }
    }

    function abrirEdicao(cliente:EditarClienteDTO){
        setFormData(cliente);
        setModalAberta(true);
    }

    async function salvarCliente() {

        try {
            const resposta = await apiRequest(formData.id_cliente? `/clientes/${formData.id_cliente}`: "/clientes", {
                method: formData.id_cliente? "PUT":"POST",
                body:JSON.stringify(formData)
            })

            setModalAberta(false);
            listarClientes();

        } catch (error) {
            
        }
    }

    async function excluirCliente(id:number) {
        try {
            const resposta = await apiRequest(`/clientes/${id}`, {method:"DELETE"})
            listarClientes();
        } catch (error) {
            
        }
    }

    return(
        <div className="flex flex-col h-full justify-center items-center text-center align-middle">

            <div className="flex w-full flex-row gap-1 p-2 ">
                <input className="flex-1" type="text" placeholder="Pesquisar..." />
                <CustomButtom funcao={()=>alert("pesquisa")} texto="pesquisar" tipo="secundario" />
                <CustomButtom funcao={()=>setModalAberta(true)} texto="Novo Cliente" tipo="terciario"/>
            </div>

            <CustomModal aberta={modalAberta} fechar={() => setModalAberta(false)}>
                <div className="flex flex-col w-80 p-6 gap-4">
                    
                    <div className="flex flex-col">
                        <label htmlFor="nome" className="text-gray-700  mb-1">Nome:</label>
                        <input id="nome" value={formData.nome} onChange={handleChange} 
                            className="text-black border rounded h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cpf" className="text-gray-700  mb-1">CPF:</label>
                        <input id="cpf" value={formData.cpf} onChange={handleChange}
                            className="text-black border rounded h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="telefone" className="text-gray-700  mb-1">Telefone:</label>
                        <input id="telefone" value={formData.telefone} onChange={handleChange}
                            className="text-black border rounded h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex justify-center gap-2">
                        <CustomButtom funcao={()=>setModalAberta(false)} texto={"cancelar"} tipo="danger"/>
                        <CustomButtom funcao={salvarCliente} texto={"salvar"} tipo="terciario"/>
                    </div>

                </div>
            </CustomModal>

            <div className="h-full w-full">
                {clientes.length>0?
                    <CustomTable tableContent={clientes} />
                    :
                    <p>Nenhum cliente cadastrado</p>
                }
            </div>
        </div>
    )
}

