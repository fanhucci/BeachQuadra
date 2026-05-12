'use client'

import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { EditarUsuarioSchema, NovoUsuarioSchema, Usuario } from "@app/shared";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function useUsuarios(){
    const [loading,setLoading] = useState<boolean>(false);
    const [buttonLoading,setButtonLoading] = useState<boolean>(false);

    const [usuarios,setUsuarios] = useState<Usuario[]>([]);
    const [formData,setFormData] = useState<Partial<Usuario>>({});
    const [erros,setErros] = useState<Partial<Record<keyof Usuario, string>>>({});

    const [modalOn,setModalOn] = useState<boolean>(false);
    const [editionOn,setEditionOn] = useState<boolean>(false);

    async function carregarUsuarios(){
        try {
            setLoading(true);
            const dados = await apiRequest(`/usuarios`);
            setUsuarios(dados);
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao carregar usuários.');
        }
        finally{
            setLoading(false);
        }
    }

    async function adicionarUsuario() {

        const parse = NovoUsuarioSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        try {
            setButtonLoading(true);

            await apiRequest(`/usuarios`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })

            toast.success(`Usuário criado com sucesso.`);
            fecharModal();
            await carregarUsuarios();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao criar usuário.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    async function editarUsuario(){

        const parse = EditarUsuarioSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        const id = parse.data.id_usuario;

        try {
            setButtonLoading(true);

            await apiRequest(`/usuarios/${id}`,{
                method:"PATCH",
                body:JSON.stringify(parse.data)
            })
            toast.success(`Usuário editado com sucesso.`);
            fecharModal();
            setEditionOn(false);
            await carregarUsuarios();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao editar usuário.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    async function ativarUsuario(id:number){
        try {
            setButtonLoading(true);
            
            await apiRequest(`/usuarios/${id}/ativar`,{
                method:'PATCH'
            })

            toast.success(`Usuário ativado com sucesso.`);
            await carregarUsuarios();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao ativar usuário.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    async function desativarUsuario(id:number){
        try {
            setButtonLoading(true);
            
            await apiRequest(`/usuarios/${id}/desativar`,{
                method:'PATCH'
            })

            toast.success(`Usuário desativado com sucesso.`);
            await carregarUsuarios();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao desativar usuário.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    const abrirModal = () =>{
        setModalOn(true);
    }

    const fecharModal = ()=>{
        setModalOn(false);
        setEditionOn(false);
        setFormData({});
        setErros({});
    }

    const abrirEdicao = (user:Usuario)=>{
        setFormData(user)
        setModalOn(true);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        let valorLimpo = value;

        if(name === 'cpf' || name === 'telefone'){
            valorLimpo = value.replace(/\D/g, '');
            valorLimpo = valorLimpo.slice(0, 11);
        }

        setFormData((prev)=>({
            ...prev,
            [name as keyof Usuario]: valorLimpo
        }));
    }

    useEffect(()=>{
        carregarUsuarios();
    },[]);

    return{
        loading,
        buttonLoading,

        usuarios,
        formData,
        erros,

        modalOn,
        editionOn,

        adicionarUsuario,
        editarUsuario,
        ativarUsuario,
        desativarUsuario,

        handleChange,
        abrirEdicao,
        abrirModal,
        fecharModal
    }
}