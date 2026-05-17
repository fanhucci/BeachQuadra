'use client'

import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { ZodType } from 'zod';

export default function usePageCrud<
    T,
    SCreate extends ZodType<any> = ZodType<any>, 
    SUpdate extends ZodType<any> = ZodType<any>
>({
    endpoint,
    criarSchema,
    editarSchema,
    idKey,
    filtro
}:{
    endpoint: string;
    criarSchema: SCreate;
    editarSchema: SUpdate;
    idKey: keyof T; 
    filtro?: string;
}){

    type CrudType = T & {
        total_geral: number;
    }

    const [loading, setLoading] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const [dados, setDados] = useState<CrudType[]>([]);
    const [formData, setFormData] = useState<Partial<T>>({});
    const [erros, setErros] = useState<Partial<Record<keyof T, string>>>({});

    const [modalOn, setModalOn] = useState<boolean>(false);
    const [editionOn, setEditionOn] = useState<boolean>(false);

    async function carregar(){
        try {
            setLoading(true);
            const resposta = await apiRequest(`/${endpoint}${filtro ?? ''}`);
            setDados(resposta);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao carregar dados.');
        } finally {
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
            await apiRequest(`/${endpoint}`, {
                method: "POST",
                body: JSON.stringify(parse.data)
            });

            toast.success(`Criado com sucesso.`);
            fecharModal();
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao criar.');
        } finally {
            setButtonLoading(false);
        }
    }

    async function editar(){
        const parse = editarSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        const id = (formData as any)[idKey]; 

        try {
            setButtonLoading(true);
            await apiRequest(`/${endpoint}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(parse.data)
            });
            toast.success(`Editado com sucesso.`);
            fecharModal();
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao editar.');
        } finally {
            setButtonLoading(false);
        }
    }

    async function ativar(id: number){
        try {
            setButtonLoading(true);
            await apiRequest(`/${endpoint}/${id}/ativar`, { method: 'PATCH' });
            toast.success(`Ativado com sucesso.`);
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao ativar.');
        } finally {
            setButtonLoading(false);
        }
    }

    async function desativar(id: number){
        try {
            setButtonLoading(true);
            await apiRequest(`/${endpoint}/${id}/desativar`, { method: 'PATCH' });
            toast.success(`Desativado com sucesso.`);
            await carregar();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao desativar.');
        } finally {
            setButtonLoading(false);
        }
    }

    const abrirModal = () => setModalOn(true);

    const fecharModal = () => {
        setModalOn(false);
        setEditionOn(false);
        setFormData({});
        setErros({});
    }


    const abrirEdicao = (data: CrudType) => {
        const { total_geral, ...dadosDoFormulario } = data;
        setFormData(dadosDoFormulario as Partial<T>);
        setEditionOn(true);
        setModalOn(true);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        const { name, value } = e.target;
        let valorLimpo = value;

        const stringValue = value ?? '';

        if(name === 'cpf' || name === 'telefone'){
            valorLimpo = stringValue.replace(/\D/g, '').slice(0, 11);
        }

        if(name === 'valor'){
            valorLimpo = stringValue.replace(/\D/g, '').slice(0, 7);
        }

        setFormData((prev) => ({
            ...prev,
            [name as keyof T]: valorLimpo
        }));
    }

    useEffect(() => {
        carregar();
    }, [filtro]);

    return {
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