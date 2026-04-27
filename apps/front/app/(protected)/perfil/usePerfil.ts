import { Permissions } from "@/components/usuarioPerfilForm";
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { AlterarPessoaDTO, AlterarPessoaSchema, AlterarSenhaDTO, AlterarSenhaSchema, ListarPessoaViewDTO } from "@app/shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type AlterarPessoaErros = Partial<Record<keyof AlterarPessoaDTO, string[]>>;
export type AleterarSenhaErro = Partial<Record<keyof AlterarSenhaDTO, string[]>>;

export default function usePerfil(){
    const [usuario,setUsuario] = useState<ListarPessoaViewDTO |null>(null);
    const [permissions,setPermissions] = useState<Permissions| null>();
    const [loading,setLoading] = useState<boolean>(true);
    const [isEditing,setIsEditing] = useState<boolean>(false);
    const [formData,setFormData] = useState<ListarPessoaViewDTO |null>(null);
    const [erros,setErros] = useState<AlterarPessoaErros>({});
    const {refreshUser} = useUser();
    const [senha,setSenha] = useState<string>("");
    const [modalAberta,setModalAberta] = useState<boolean>(false);
    const [errosSenha,setErrosSenha] = useState<AleterarSenhaErro>({});

    useEffect(()=>{
        carregarPerfil();
    },[])



    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setFormData(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                [name]: value,
            };
        });
    }
    

    function abrirEdicao(){
        setIsEditing(true);
    }

    function fecharEdicao(){
        setIsEditing(false);
        setFormData(usuario)
        setErros({});
    }

    async function salvarPerfil() {
        try {
            if(!formData) return;

            const parse = AlterarPessoaSchema.safeParse(formData);

            if(!parse.success){
                setErros(parse.error.flatten().fieldErrors);
                return;
            }

            const resposta = await apiRequest(`/pessoas/${parse.data.id_pessoa}`,{
                method:"PATCH",
                body:JSON.stringify(parse.data)
            })
            setFormData(resposta);
            setUsuario(resposta);
            fecharEdicao();
            carregarPerfil();
            refreshUser();
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function carregarPerfil() {
        try {
            setLoading(true);

            const data = await apiRequest(`/usuarios/perfil`);

            setUsuario(data.usuario);
            setPermissions(data.permissions);
            setFormData(data.usuario);

        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
        finally{
            setLoading(false);
        }
    }

    function abrirModalSenha(){
        setModalAberta(true);
    }

    function fechaModalSenha(){
        setSenha("");
        setErrosSenha({});
        setModalAberta(false);
    }

    async function alterarSenha(){
        
        const parse = AlterarSenhaSchema.safeParse({
            id_conta:usuario?.id_conta,
            senha:senha
        });

        if(!parse.success){
            setErrosSenha(parse.error.flatten().fieldErrors);
            return;
        }

        try {
            await apiRequest(`/contas/senha`,{
                method:"PATCH",
                body:JSON.stringify(parse.data)
            })
            fechaModalSenha();
            toast.success("Senha atualizada com sucesso!");

        }   
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function excluirConta() {
        alert("Conta excluida")
    }


    


    return{
        usuario,
        permissions,
        loading,
        isEditing,
        formData,
        erros,
        errosSenha,
        senha,
        setSenha,
        modalAberta,
        handleChange,
        abrirEdicao,
        fecharEdicao,
        salvarPerfil,
        alterarSenha,
        excluirConta,
        abrirModalSenha,
        fechaModalSenha
    }
}