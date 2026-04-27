import { ListarPessoaViewDTO } from "@app/shared";
import Campo from "./campo";
import { AleterarSenhaErro, AlterarPessoaErros } from "@/app/(protected)/perfil/usePerfil";
import CustomModal from "./customModal";
import CustomButtom from "./customButton";

export type Permissions = {
  canEdit: boolean;
  canChangePassword: boolean;
  canResetPassword: boolean;
  canActivateAccount: boolean;
  canDeactivateAccount: boolean;
  canChangeAccountStatus:boolean;
  canDelete: boolean;
}

type Props = {
  
    usuario: ListarPessoaViewDTO | null;
    permissions:Permissions;
    formData?: ListarPessoaViewDTO | null;
    isEditing?: boolean;
    erros?: AlterarPessoaErros;
    erroSenha?:AleterarSenhaErro;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    abrirEdicao?: () => void;
    fecharEdicao?: () => void;
    salvarPerfil?: () => void;
    alterarSenha?: () => void;
    excluirConta?: () => void;
    redefinirSenha?: () => void;
    ativarConta?: () => void;
    desativarConta?: () => void;
    modalAberta?:boolean;
    abrirModalSenha?:()=>void;
    fecharModalSenha?:()=>void;
    senha:string;
    setSenha:(value:string)=>void;
};

export default function UsuarioPerfilForm({
        usuario,
        permissions,
        formData,
        isEditing,
        erros,
        handleChange,
        abrirEdicao,
        fecharEdicao,
        salvarPerfil,
        alterarSenha,
        excluirConta,
        redefinirSenha,
        ativarConta,
        desativarConta,
        modalAberta,
        abrirModalSenha,
        fecharModalSenha,
        erroSenha,
        senha,
        setSenha
        
    }: Props) {

        if (!usuario) return;


        return (
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-6">Perfil do Usuário</h1>

                <div className="bg-white shadow rounded-2xl p-6 space-y-4">

                    {
                        isEditing && formData?
                            (<div className="flex flex-col gap-3">

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="nome" className="text-sm text-gray-600">
                                        Nome
                                    </label>
                        
                                    <input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        value={formData.nome}
                                        onChange={handleChange}
                                        className={`
                                        border rounded-lg h-10 px-3
                                        focus:outline-none focus:ring-2 focus:ring-blue-400
                                        transition
                                        ${erros?.nome ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                                        `}
                                    />
                        
                                    {erros?.nome && (
                                        <p className="text-xs text-red-500">
                                            {erros?.nome}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="cpf" className="text-sm text-gray-600">
                                        CPF
                                    </label>
                        
                                    <input
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        className={`
                                        border rounded-lg h-10 px-3
                                        focus:outline-none focus:ring-2 focus:ring-blue-400
                                        transition
                                        ${erros?.cpf ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                                        `}
                                    />
                        
                                    {erros?.cpf && (
                                        <p className="text-xs text-red-500">
                                            {erros?.cpf}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-sm text-gray-600">
                                        E-mail
                                    </label>
                                    <input
                                        type="text"
                                        name="email"
                                        
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className={`
                                            border rounded-lg h-10 px-3
                                            focus:outline-none focus:ring-2 focus:ring-blue-400
                                            transition
                                            ${erros?.email ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                                        `}
                                    />
                                    {erros?.email && (
                                        <p className="text-xs text-red-500">
                                            {erros?.email}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="telefone" className="text-sm text-gray-600">
                                        Telefone
                                    </label>
                        
                                    <input
                                        id="telefone"
                                        name="telefone"
                                        type="text"
                                        value={formData.telefone}
                                        onChange={handleChange}
                                        className={`
                                        border rounded-lg h-10 px-3
                                        focus:outline-none focus:ring-2 focus:ring-blue-400
                                        transition
                                        ${erros?.telefone ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                                        `}
                                    />
                        
                                    {erros?.telefone && (
                                        <p className="text-xs text-red-500">
                                            {erros?.telefone}
                                        </p>
                                    )}
                                </div>

                                {permissions.canDeactivateAccount && (
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="id_cargo" className="text-sm text-gray-600">
                                            Cargo
                                        </label>
                            
                                        <select
                                            id="id_cargo"
                                            name="id_cargo"
                                            value={formData.id_cargo}
                                            onChange={handleChange}
                                            className={`
                                            border rounded-lg h-10 px-3 bg-white
                                            focus:outline-none focus:ring-2 focus:ring-blue-400
                                            transition
                                            ${erros?.id_cargo ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                                            `}
                                        >
                                            <option value="0" disabled>
                                                Selecione um cargo...
                                            </option>
                                            <option value={1}>Cliente</option>
                                            <option value={2}>Funcionário</option>
                                            <option value={3}>Administrador</option>
                                        </select>
                            
                                        {erros?.id_cargo && (
                                            <p className="text-xs text-red-500">
                                                {erros?.id_cargo}
                                            </p>
                                        )}
                                    </div>
                                )

                                }

                                <button
                                    onClick={salvarPerfil}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    Salvar
                                </button>

                            </div>)
                        :  
                        (<div>
                            <Campo label="Nome" valor={usuario.nome} />
                            <Campo label="CPF" valor={usuario.cpf} />
                            <Campo label="Email" valor={usuario.email} />
                            <Campo label="Telefone" valor={usuario.telefone} />
                            <Campo label="Cargo" valor={usuario.cargo} />
                        </div>)
                    }
                    <Campo
                    label="Status"
                    valor={usuario.ativo ? "Ativo" : "Inativo"}
                    />

                    <div className="pt-6 flex flex-wrap gap-3">

                        {permissions.canEdit && (
                            isEditing? 
                                <button
                                onClick={fecharEdicao}
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                >
                                Cancelar
                                </button>
                            :
                                <button
                                onClick={abrirEdicao}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                Editar perfil
                                </button>
                            
                                
                        )}

                        {permissions.canChangePassword && (
                            <button
                            onClick={abrirModalSenha}
                            className="px-4 py-2 bg-yellow-500 text-white rounded"
                            >
                            Alterar senha
                            </button>
                        )}

                        {permissions.canResetPassword && (
                            <button
                            onClick={redefinirSenha}
                            className="px-4 py-2 bg-orange-500 text-white rounded"
                            >
                            Redefinir senha
                            </button>
                        )}

                        {permissions.canActivateAccount && (
                            <button
                            onClick={ativarConta}
                            className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                            Ativar conta
                            </button>
                        )}

                        {permissions.canDeactivateAccount && (
                            <button
                            onClick={desativarConta}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                            >
                            Desativar conta
                            </button>
                        )}

                        {permissions.canDelete && (
                            <button
                            onClick={excluirConta}
                            className="px-4 py-2 bg-black text-white rounded"
                            >
                            Excluir conta
                            </button>
                        )}

                    </div>
                </div>

                {permissions.canChangePassword && (
                    <CustomModal aberta={modalAberta} fechar={fecharModalSenha}>
                        <div className="flex flex-col gap-1 pb-5">
                            <label htmlFor="senha" className="text-sm text-gray-600">
                                Nova Senha
                            </label>
                        
                            <input
                                id="senha"
                                name="senha"
                                type="text"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className={`
                                border rounded-lg h-10 px-3
                                focus:outline-none focus:ring-2 focus:ring-blue-400
                                transition
                                ${erroSenha?.senha ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                                `}
                            />
                        
                            {erroSenha?.senha && (
                                <p className="text-xs text-red-500">
                                    {erroSenha.senha}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-row gap-2 justify-center">
                            <CustomButtom funcao={fecharModalSenha} texto="Cancelar" tipo="danger"/>
                            <CustomButtom funcao={alterarSenha} texto="Salvar" tipo="secundario"/>
                        </div>
                    </CustomModal>
                )}
            </div>
        );
}