'use client'

import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { AlterarSenhaPerfil, AlterarSenhaPerfilSchema, EditarUsuario, EditarUsuarioSchema } from "@app/shared";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SubmitButton from "../buttonComponents/submitButton";
import CustomInput from "../inputsComponents/customInput";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import Campo from "../inputsComponents/campo";
import NaoEncontrado from "../erros/naoEncontrado";
import CustomModal from "../customModal";


interface PerfilUsuario {
    id_pessoa: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    id_cargo: number;
    cargo: string;
    ativo: boolean;
}

export default function PerfilForm({   
    id_perfil,
    isUser,
    isAdmin
}: {
    id_perfil: number;
    isUser: boolean;
    isAdmin: boolean;
}) {

    const [usuario, setUsuario] = useState<PerfilUsuario | null>(null);
    const [formData, setFormData] = useState<EditarUsuario>({ id_pessoa: 0 });
    const [erros, setErros] = useState<Partial<Record<keyof EditarUsuario, string>>>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [modalSenhaOn,setModalSenhaOn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    async function buscarUsuario() {
        try {
            setLoading(true);
            const dados = await apiRequest(`/usuarios/${id_perfil}`);
            setUsuario(dados);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao buscar dados do perfil.");
        } finally {
            setLoading(false);
        }
    }

    async function salvarUsuario(e: React.FormEvent<HTMLFormElement>) {
        try {
            e.preventDefault();
            setLoading(true);

            const parse = EditarUsuarioSchema.safeParse(formData);

            if (!parse.success) {
                setErros(formatarErrosZod(parse.error));
                return;
            }

            await apiRequest(`/usuarios/${id_perfil}`, {
                method: 'PATCH',
                body: JSON.stringify(parse.data)
            });

            toast.success('Perfil atualizado com sucesso.');
            setIsEditing(false);
            buscarUsuario();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao atualizar dados do perfil.");
        } finally {
            setEditingOff();
            setLoading(false);
        }
    }

    const setEditingOn = () => {
        if (!usuario) return;
        setFormData(usuario);
        setErros({});
        setIsEditing(true);
    };

    const setEditingOff = () => {
        setIsEditing(false);
        setFormData({ id_pessoa: id_perfil });
        setErros({});
    };

    const abrirModalSenha = () =>{
        setModalSenhaOn(true);
    }

    const fecharModalSenha = () =>{
        setModalSenhaOn(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let valorLimpo = value;

        if (name === 'cpf' || name === 'telefone') {
            valorLimpo = valorLimpo.replace(/\D/g, '');
            valorLimpo = valorLimpo.slice(0, 11);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: name === 'id_cargo' ? Number(valorLimpo) : valorLimpo
        }));
    };

    useEffect(() => {
        buscarUsuario();
    }, [id_perfil]);

    if (!usuario && !loading) return <NaoEncontrado />;

    return (
        <section className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 w-full">
            <div className="bg-white shadow-xl rounded-2xl border border-gray-100 p-5 sm:p-8 relative overflow-hidden">
                
                <div className="border-b border-gray-100 pb-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                        {isEditing ? "Editando Perfil" : "Informações do Perfil"}
                    </h3>
                </div>

                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[2px] transition-all">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={salvarUsuario} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <CustomInput
                                label="Nome Completo"
                                name="nome"
                                value={formData?.nome || ''}
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
                                type="text"
                            />

                            <CustomInput
                                label="E-mail"
                                name="email"
                                value={formData?.email || ''}
                                onChange={handleChange}
                                erro={erros.email}
                                type="email"
                            />

                            <CustomInput
                                label="Telefone / Celular"
                                name="telefone"
                                value={telefoneMask(formData?.telefone || "")}
                                onChange={handleChange}
                                erro={erros.telefone}
                                type="tel"
                            />

                           
                            {isAdmin && !isUser && (
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label htmlFor="id_cargo" className="text-sm font-semibold text-gray-700">
                                        Cargo do Usuário
                                    </label>
                                    <select
                                        id="id_cargo"
                                        name="id_cargo"
                                        value={formData.id_cargo || 0}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-xl h-11 px-3 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    >
                                        <option value={0} disabled>Selecione um cargo...</option>
                                        <option value={1}>Cliente</option>
                                        <option value={2}>Funcionário</option>
                                        <option value={3}>Administrador</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 sm:justify-end border-t border-gray-100">
                            <div className="w-full sm:w-auto order-2 sm:order-1">
                                <SubmitButton estilo="secundario" type="button" onClick={setEditingOff}>
                                    <span className="w-full text-center">Cancelar</span>
                                </SubmitButton>
                            </div>
                            <div className="w-full sm:w-auto order-1 sm:order-2">
                                <SubmitButton estilo="primario" type="submit">
                                    <span className="w-full text-center">Salvar Alterações</span>
                                </SubmitButton>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <Campo label="Nome" valor={usuario?.nome || 'Não informado'} />
                            <Campo label="CPF" valor={cpfMask(usuario?.cpf || '')} />
                            <Campo label="E-mail" valor={usuario?.email || 'Não informado'} />
                            <Campo label="Telefone" valor={telefoneMask(usuario?.telefone || '')} />
                            <Campo label="Cargo" valor={usuario?.cargo || 'Não informado'} />
                            <Campo label="Status da Conta" valor={usuario?.ativo ? "Ativo" : "Inativo"} />
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row flex-wrap items-center gap-3 border-t border-gray-100">
                            {(isUser || isAdmin) && (
                                <div className="w-full sm:w-auto">
                                    <SubmitButton estilo="primario" type="button" onClick={setEditingOn}>
                                        <span className="w-full text-center">Editar Perfil</span>
                                    </SubmitButton>
                                </div>
                            )}

                            {isUser && (
                                <div className="w-full sm:w-auto">
                                    <SubmitButton estilo="perigo" type="button" onClick={abrirModalSenha}>
                                        <span className="w-full text-center">Alterar Minha Senha</span>
                                    </SubmitButton>
                                </div>
                            )}

                            {isAdmin && !isUser && (
                                <div className="w-full sm:w-auto">
                                    <SubmitButton estilo="perigo" type="button" onClick={() => {/* API */}}>
                                        <span className="w-full text-center">Redefinir Senha</span>
                                    </SubmitButton>
                                </div>
                            )}

                            {isAdmin && !isUser && !usuario?.ativo && (
                                <div className="w-full sm:w-auto">
                                    <SubmitButton estilo="primario" type="button" onClick={() => {/* API */}}>
                                        <span className="w-full text-center">Ativar Conta</span>
                                    </SubmitButton>
                                </div>
                            )}

                            {isAdmin && !isUser && usuario?.ativo && (
                                <div className="w-full sm:w-auto">
                                    <SubmitButton estilo="perigo" type="button" onClick={() => {/* API */}}>
                                        <span className="w-full text-center">Desativar Conta</span>
                                    </SubmitButton>
                                </div>
                            )}

                            {isAdmin && !isUser && (
                                <div className="w-full sm:w-auto sm:ml-auto">
                                    <SubmitButton estilo="perigo" type="button" onClick={() => {/* API */}}>
                                        <span className="w-full text-center">Excluir Conta</span>
                                    </SubmitButton>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ModalSenha
                estado={modalSenhaOn}
                abrir={abrirModalSenha}
                fechar={fecharModalSenha}
            />
        </section>
    );
}

interface AlterarSenha {
    senha:string;
    senhaConfirmar:string;
}

function ModalSenha({estado, abrir, fechar}:{estado:boolean, abrir:()=>void, fechar:()=>void}){

    const [formDataSenha,setFormDataSenha] = useState<Partial<AlterarSenha>>({});
    const [errosSenha,setErrosSenha] = useState<Partial<Record<keyof AlterarSenhaPerfil,string>>>({});
    const [loading,setLoading] = useState<boolean>(false);

    async function salvarSenha() {
        const parse = AlterarSenhaPerfilSchema.safeParse(formDataSenha);

        if(!parse.success){
            setErrosSenha(formatarErrosZod(parse.error));
            return;
        }

        try {
            await apiRequest(`/contas/senha`,{
                method:'PATCH',
                body:JSON.stringify(parse.data)
            })
            toast.success('Senha alterada com sucesso.');
            fechar();
            setFormDataSenha({});
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : 'Erro ao alterar senha.')
        }
        finally{
            setLoading(false);
        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target;

        setFormDataSenha((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    useEffect(()=>{
        if(!estado){
            setFormDataSenha({})
            setErrosSenha({})
        }
    },[estado]);

    return(
        <CustomModal
            estado={estado}
            fechar={fechar}
            titulo="Alterar Senha"
            botoes={[
                {
                    label: 'Cancelar',
                    estilo: 'secundario',
                    disabled:loading,
                    onClick: fechar
                },
                {
                    label: 'Salvar',
                    estilo: 'primario',
                    disabled:loading,
                    onClick: salvarSenha
                }
            ]}
        >

            <CustomInput
                name="senha"
                label="Senha"
                placeholder="******"
                value={formDataSenha.senha || ''}
                onChange={handleChange}
                erro={errosSenha.senha}
                type="password"
            />

            <CustomInput
                name="senhaConfirmar"
                label="Confirmar Senha"
                placeholder="******"
                value={formDataSenha.senhaConfirmar || ''}
                onChange={handleChange}
                erro={errosSenha.senhaConfirmar}
                type="password"
            />

        </CustomModal>
    )
}