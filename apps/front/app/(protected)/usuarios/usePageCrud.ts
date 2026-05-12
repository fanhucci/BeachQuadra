'use client'

import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { ZodType } from 'zod';

export default function usePageCrud<
    T,
    SCreate extends ZodType<any>,
    SUpdate extends ZodType<any>
>({
    endpoint,
    criarSchema,
    editarSchema
}:{
    endpoint:string;
    criarSchema:SCreate;
    editarSchema:SUpdate;
}){
    const [loading,setLoading] = useState<boolean>(false);
    const [buttonLoading,setButtonLoading] = useState<boolean>(false);

    const [dados,setDados] = useState<T[]>([]);
    const [formData,setFormData] = useState<Partial<T>>({});
    const [erros,setErros] = useState<Partial<Record<keyof T, string>>>({});

    const [modalOn,setModalOn] = useState<boolean>(false);
    const [editionOn,setEditionOn] = useState<boolean>(false);

    async function carregar(){
        try {
            setLoading(true);
            const resposta = await apiRequest(`/${endpoint}`);
            setDados(resposta);
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao carregar dados.');
        }
        finally{
            setLoading(false);
        }
    }

    async function adicionar() {

        const parse = criarSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        try {
            setButtonLoading(true);

            await apiRequest(`/${endpoint}`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })

            toast.success(`Dado criado com sucesso.`);
            fecharModal();
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao criar dado.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    async function editar(){

        const parse = editarSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        const id = parse.data.id;

        try {
            setButtonLoading(true);

            await apiRequest(`/${endpoint}/${id}`,{
                method:"PATCH",
                body:JSON.stringify(parse.data)
            })
            toast.success(`Dado editado com sucesso.`);
            fecharModal();
            setEditionOn(false);
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao editar dado.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    async function ativar(id:number){
        try {
            setButtonLoading(true);
            
            await apiRequest(`/${endpoint}/${id}/ativar`,{
                method:'PATCH'
            })

            toast.success(`Dado ativado com sucesso.`);
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao ativar dado.');
        }
        finally{
            setButtonLoading(false);
        }
    }

    async function desativar(id:number){
        try {
            setButtonLoading(true);
            
            await apiRequest(`/${endpoint}/${id}/desativar`,{
                method:'PATCH'
            })

            toast.success(`Dado desativado com sucesso.`);
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao desativar dado.');
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

    const abrirEdicao = (data:T)=>{
        setFormData(data);
        setEditionOn(true);
        setModalOn(true);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        let valorLimpo = value;

        if(name === 'cpf' || name === 'telefone'){
            valorLimpo = value.replace(/\D/g, '');
            valorLimpo = valorLimpo.slice(0, 11);
        }

        if(name === 'valor'){
            
            valorLimpo = value.replace(/\D/g, '');
            valorLimpo = valorLimpo.slice(0, 7);
        }

        setFormData((prev)=>({
            ...prev,
            [name as keyof T]: valorLimpo
        }));
    }

    useEffect(()=>{
        carregar();
    },[]);

    return{
        loading,
        buttonLoading,

        dados,
        formData,
        erros,

        modalOn,
        editionOn,

        adicionar,
        editar,
        ativar,
        desativar,

        handleChange,
        abrirEdicao,
        abrirModal,
        fecharModal
    }
}