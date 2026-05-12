'use client'

import { apiRequest } from "@/utils/apiHandler";
import { dinheiroMask } from "@/utils/mascaras";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { EditarQuadraSchema, NovaQuadraSchema, Quadra } from "@app/shared";
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner";

interface FiltrosParams{
    search:string;
    tipo:string;
    status:string;
    ativo:string;
}

export default function useQuadra(){

    const searchParams:FiltrosParams = {
        search:"",
        tipo:"",
        status:"",
        ativo:""
    }

    const estadoInicial:Quadra = {
        id:0,
        nome:"",
        tipo:"individual",
        status:true,
        valor:0,
        ativo:true
    }

    const [loading,setLoading] = useState<boolean>(false);
    const [quadras,setQuadras] = useState<Quadra[]>([]);
    const [filtros,setFiltros] = useState<FiltrosParams>(searchParams);
    const [formData,setFormData] = useState<Quadra>(estadoInicial);
    const [erros,setErros] = useState<Partial<Record<keyof Quadra, string>>>({});
    const [modalOn,setModalOn] = useState<boolean>(false);
    const [editionOn,setEditionOn] = useState<boolean>(false);

    async function carregarQuadras() {

        const params = new URLSearchParams(
            Object.entries(filtros).filter(([_, v]) => v !== "")
        );

        try {
            setLoading(true);

            const dados = await apiRequest(`/quadras?${params.toString()}`);

            setQuadras(dados);

        } 
        catch (error){
            toast.error(error instanceof Error? error.message : 'Erro ao buscar quadras');
        }
        finally{
            setLoading(false);
        }
    }

    async function adicionarQuadra(){
        const parse = NovaQuadraSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        try{
            await apiRequest(`/quadras`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })
            toast.success('Quadra salva');
            setErros({});
            setFormData(estadoInicial);
            fecharModal();
            await carregarQuadras();
        }
        catch(error){
            toast.error(error instanceof Error? error.message : 'Erro ao salvar quadra');
        }

    }

    async function editarQuadra(){
        const parse = EditarQuadraSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        const id = parse.data.id;

        try{
            await apiRequest(`/quadras/${id}`,{
                method:"PUT",
                body:JSON.stringify(parse.data)
            })
            toast.success('Quadra atualizada');
            setErros({});
            setFormData(estadoInicial);
            fecharModal();
            await carregarQuadras();
        }
        catch(error){
            toast.error(error instanceof Error? error.message : 'Erro ao editar quadra');
        }
        finally{
            setEditionOn(false)
        }
    }

    async function desativarQuadra(id:number){
        try {
            await apiRequest(`/quadras/${id}/desativar`,{
                method:'PATCH'
            });
            toast.success('Quadra desativada')
            await carregarQuadras();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao desativar quadra');
        }
    }

    async function ativarQuadra(id:number){
        try {
            await apiRequest(`/quadras/${id}/ativar`,{
                method:'PATCH'
            });
            toast.success('Quadra ativada')
            await carregarQuadras();
        } catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao ativar quadra');
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;

        let valorLimpo = value;

        if(name === 'valor') {
            valorLimpo = value.replace(/\D/g, '');
            valorLimpo = valorLimpo.slice(0,7)
        }

        setFormData((prev)=>({
            ...prev,
            [name]:valorLimpo
        }))
    }

    const abrirEdicao = (quadra:Quadra) =>{
        setFormData(quadra);
        setEditionOn(true)
        setModalOn(true);
    }

    const abrirModal = () =>{
        setFormData(estadoInicial);
        setErros({});
        setModalOn(true);
    }

    const fecharModal = () =>{
        setFormData(estadoInicial);
        setModalOn(false);
        setEditionOn(false);
        setErros({});
    }

    const columns = useMemo(() => [
        { key: "nome", label: "Nome" },
        { key: "tipo", label: "Tipo" },
        { 
            key: "valor", 
            label: "Valor", 
            render: (val: number) => dinheiroMask(val)
        },
        { 
            key: "status", 
            label: "Status",
            render: (status: boolean) => status ? "🟢 Disponível" : "🔴 Indisponível"
        },
        {
            key: "acoes",
            label: "Ações",
            render: (_: any, quadra: Quadra) => (
                <div className="flex gap-2">
                    <button onClick={() => abrirEdicao(quadra)}>Editar</button>
                    {quadra.ativo 
                        ? <button onClick={() => desativarQuadra(quadra.id)}>Desativar</button>
                        : <button onClick={() => ativarQuadra(quadra.id)}>Ativar</button>
                    }
                </div>
            )
        }
    ], [quadras]);

    useEffect(()=>{
        carregarQuadras();
    },[filtros])

    return{
        loading,
        filtros,
        columns,
        quadras,
        formData,
        erros,
        modalOn,
        editionOn,
        handleChange,
        setFiltros,
        adicionarQuadra,
        editarQuadra,
        abrirModal,
        fecharModal,
        
    }
}