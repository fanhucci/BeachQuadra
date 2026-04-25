import { ListarPessoaViewDTO } from "@app/shared";
import Campo from "./campo";

type usuarioPerfilFormType ={
    usuario:ListarPessoaViewDTO,
    alterarStatus:()=>void,
    redefinirSenha:()=>void
}

export default function UsuarioPerfilForm({usuario, alterarStatus, redefinirSenha}:usuarioPerfilFormType){
    if(!usuario) return null;
    
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Perfil do Usuário</h1>

            <div className="bg-white shadow rounded-2xl p-6 space-y-4">

                <Campo label="Nome" valor={usuario.nome} />
                <Campo label="CPF" valor={usuario.cpf} />
                <Campo label="Email" valor={usuario.email} />
                <Campo label="Telefone" valor={usuario.telefone} />
                <Campo label="Cargo" valor={usuario.cargo} />
                <Campo 
                label="Status" 
                valor={usuario.ativo ? "Ativo" : "Inativo"} 
                />

            </div>
        </div>
    )
}