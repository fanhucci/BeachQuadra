'use client'

import CustomButtom from "@/components/customButton";
import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react"

export default function UsuariosPage(){
    const estadoInicial = {
        id_usuario:null,
        usuario:"",
        senha:"",
        cargo:0
    }

    const [modalAberta,setModalAberta] = useState(false);
    const [usuarios,setUsuarios] = useState([]);
    const [formData,setFormData] = useState(estadoInicial);

    const handleChange = (e) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }

    useEffect(()=>{
        listarUsuarios();
    },[]);

    useEffect(()=>{
        if(!modalAberta){
            setFormData(estadoInicial);
        }
    },[modalAberta]);


    async function listarUsuarios(){
        try {
            const data = await apiRequest("/usuarios");
            const tabela = data.map((usuario)=>({
                ...usuario,
                "ações":(
                    <div className="inline-flex justify-center gap-2">
                        <CustomButtom funcao={()=>abrirEdicao(usuario)} texto="editar" tipo="secundario" />
                        <CustomButtom funcao={()=>excluirUsuario(usuario.id_usuario)} texto="excluir" tipo="danger" />
                    </div>
                )
            }));
            setUsuarios(tabela);
        } catch (error) {
            
        }
    }

    function abrirEdicao(usuario){
        setFormData(usuario);
        setModalAberta(true);
    }

    async function salvarUsuario(){
        console.log(formData)
        try {
            const resultado = await apiRequest(formData.id_usuario? `/usuarios/${formData.id_usuario}`: "/usuarios",{
                method: formData.id_usuario? "PUT":"POST",
                body:JSON.stringify(formData)
            })
            setModalAberta(false);
            listarUsuarios();
        } catch (error) {
            
        }
    }

    async function excluirUsuario(id:number){
        try {
            const resultado = await apiRequest(`/usuarios/${id}`,{
                method:"DELETE"
            })

            listarUsuarios();
        } catch (error) {
            
        }
    }

    

    return(
        <div className="flex flex-col flex-1">
            <div className="flex w-full flex-row gap-1 p-2 ">
                <input className="flex-1" type="text" placeholder="Pesquisar..." />
                <CustomButtom funcao={()=>alert("pesquisa")} texto="pesquisar" tipo="secundario" />
                <CustomButtom funcao={()=>setModalAberta(true)} texto="Novo Usuário" tipo="terciario"/>
            </div>

            <CustomModal aberta={modalAberta} fechar={() => setModalAberta(false)}>
                <div className="flex flex-col w-80 p-6 gap-4">                     
                    <div className="flex flex-col">
                        <label htmlFor="usuario" className="text-gray-700  mb-1">Usuário:</label>
                        <input id="usuario" value={formData.usuario} onChange={handleChange} 
                            className=" border rounded-xl h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                        
                    <div className="flex flex-col">
                        <label htmlFor="senha" className="text-gray-700  mb-1">Senha:</label>
                        <input id="senha" value={formData.senha} onChange={handleChange} 
                            className="border rounded-xl h-8 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-1" htmlFor="cargo">Cargo:</label>
                        <select name="cargo" id="cargo" value={formData.cargo} onChange={handleChange} className="text-black border rounded-xl h-10 px-2 bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none shadow-sm">
                            <option value="0" disabled>Selecione um cargo...</option>
                            <option value="1">Cliente</option>
                            <option value="2">Funcionário</option>
                            <option value="3">Administrador</option>
                        </select>
                    </div>
                        
                    <div className="flex justify-center gap-2">
                        <CustomButtom funcao={()=>setModalAberta(false)} texto={"cancelar"} tipo="danger"/>
                        <CustomButtom funcao={salvarUsuario} texto={"salvar"} tipo="terciario"/>
                    </div>
                        
                </div>
            </CustomModal>

            {
                usuarios.length>0? 
                    <CustomTable tableContent={usuarios}/>
                    :
                    <p>Nenhum usuário cadastrado</p>
            }
        </div>
    )
}