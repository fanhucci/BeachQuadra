'use client'

import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { EditarUsuario, EditarUsuarioSchema, Usuario } from "@app/shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../buttonComponents/submitButton";
import CustomInput from "../inputsComponents/customInput";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import Campo from "../inputsComponents/campo";

export default function PerfilForm(
{   
    id_perfil,
    isUser,
    isAdmin
}:{
    id_perfil:number;
    isUser:boolean;
    isAdmin:boolean;
}){

    const [usuario,setUsuario] = useState<Usuario|null>(null);
    const [formData,setFormData] = useState<EditarUsuario>({id_pessoa:0});
    const [erros,setErros] = useState<Partial<Record<keyof Usuario, string>>>({});
    const [isEditing,setIsEditing] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);

    async function buscarUsuario() {
        try {
            setLoading(true);

            const dados = await apiRequest(`/usuarios/${id_perfil}`);

            setUsuario(dados);
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro ao buscar dados do perfil.");
        }
        finally{
            setLoading(false)
        }
    }

    async function salvarUsuario(e:React.SubmitEvent<HTMLFormElement>){
        try {
            e.preventDefault();

            setLoading(true);

            const parse = EditarUsuarioSchema.safeParse(formData);

            if(!parse.success){
                setErros(formatarErrosZod(parse.error));
                return;
            }

            await apiRequest(`/usuarios/${id_perfil}`,{
                method:'PATCH',
                body:JSON.stringify(parse.data)
            });

            toast.success('Perfil atualizado com sucesso.');
            buscarUsuario();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro ao atualizar dados do perfil.");
        }
        finally{
            setLoading(false)
        }
    }

    const setEditingOn = ()=>{
        if(!usuario) return;

        setFormData(usuario);
        setErros({});
        setIsEditing(true);
    }

    const setEditingOff = ()=>{

        setIsEditing(false);
        setFormData({id_pessoa:id_perfil});
        setErros({});
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        let valorLimpo = value;

        if(name === 'cpf' || name === 'telefone'){
            valorLimpo = value.replace(/\D/g, '');
            valorLimpo = value.slice(0,11);
        }

        setFormData((prev)=>({
            ...prev,
            [name]:valorLimpo
        }))
    }
 
    useEffect(()=>{
        buscarUsuario();
    },[id_perfil])
    
    if(!usuario) return <>Nenhum usuario encontrado</>
    
    return (
        <section className="max-w-3xl mx-auto p-6">
            {
                isEditing?
                (
                    <form onSubmit={salvarUsuario}>

                        <CustomInput
                            label="Nome"
                            name="nome"
                            value={formData?.nome}
                            onChange={handleChange}
                            erro={erros.nome}
                            type="text"
                        />

                        <CustomInput
                            label="CPF"
                            name="cpf"
                            value={cpfMask(formData?.cpf || "")}
                            onChange={handleChange}
                            erro={erros.cpf}
                            type="cpf"
                        />

                        <CustomInput
                            label="E-mail"
                            name="email"
                            value={formData?.email}
                            onChange={handleChange}
                            erro={erros.email}
                            type="email"
                        />

                        <CustomInput
                            label="Telefone"
                            name="telefone"
                            value={telefoneMask(formData?.telefone || "")}
                            onChange={handleChange}
                            erro={erros.telefone}
                            type="tel"
                        />

                        <SubmitButton
                            estilo="secundario"
                            onClick={setEditingOff}
                        >
                            <span>Cancelar</span>
                        </SubmitButton>

                        <SubmitButton
                            estilo="perigo"
                            onClick={()=>salvarUsuario}
                        >
                            <span>Salvar</span>
                        </SubmitButton>
                    </form>
                ):(
                    <div>
                        <Campo
                            label="Nome"
                            valor={usuario?.nome}
                        />

                        <Campo
                            label="CPF"
                            valor={usuario?.cpf}
                        />

                        <Campo
                            label="E-mail"
                            valor={usuario?.email}
                        />

                        <Campo
                            label="Telefone"
                            valor={usuario?.telefone}
                        />

                        <Campo 
                            label="Status da Conta" 
                            valor={usuario?.ativo ? "Ativo" : "Inativo"} 
                        />
                       
                    </div>
                )

            }
            
            {!isEditing && (
                <div className="pt-6 flex flex-wrap gap-3 border-t border-gray-100">

                    {(isUser || isAdmin) && (
                        <SubmitButton
                            estilo="primario"
                            onClick={setEditingOn}
                        >
                            <span>Editar Perfil</span>
                        </SubmitButton>
                    )}


                    {isUser && (
                        <SubmitButton
                            estilo="perigo" 
                            onClick={() => {/* Sua lógica de abrir modal aqui */}}
                        >
                            <span>Alterar Minha Senha</span>
                        </SubmitButton>
                    )}

                    {isAdmin && !isUser && (
                        <SubmitButton
                            estilo="perigo"
                            onClick={() => {/* Chamada de API para redefinir */}}
                        >
                            <span>Redefinir Senha</span>
                        </SubmitButton>
                    )}

                  
                    {isAdmin && !isUser && !usuario?.ativo && (
                        <SubmitButton
                            estilo="primario"
                            onClick={() => {/* Chamada de API para ativar */}}
                        >
                            <span>Ativar Conta</span>
                        </SubmitButton>
                    )}

                    {isAdmin && !isUser && usuario?.ativo && (
                        <SubmitButton
                            estilo="perigo"
                            onClick={() => {/* Chamada de API para desativar */}}
                        >
                            <span>Desativar Conta</span>
                        </SubmitButton>
                    )}

                    {isAdmin && !isUser && (
                        <SubmitButton
                            estilo="perigo"
                            onClick={() => {/* Chamada de API para deletar */}}
                        >
                            <span>Excluir Conta</span>
                        </SubmitButton>
                    )}
                </div>
            )}


        </section>
    );
}