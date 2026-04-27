'use client'
import UsuarioPerfilForm from "@/components/usuarioPerfilForm";
import usePerfil from "./usePerfil";


export default function UsuarioPage(){

    const perfil = usePerfil();

    if (perfil.loading) return <p>Carregando...</p>;

    if(!perfil.usuario || !perfil.permissions) return null;

    return(
        <UsuarioPerfilForm 
            usuario={perfil.usuario}
            permissions={perfil.permissions}
            formData={perfil.formData}
            isEditing={perfil.isEditing}
            erros={perfil.erros}
            erroSenha={perfil.errosSenha}
            modalAberta={perfil.modalAberta}
            abrirModalSenha={perfil.abrirModalSenha}
            fecharModalSenha={perfil.fechaModalSenha}
            handleChange={perfil.handleChange}
            abrirEdicao={perfil.abrirEdicao}
            fecharEdicao={perfil.fecharEdicao}
            salvarPerfil={perfil.salvarPerfil}
            alterarSenha={perfil.alterarSenha}
            excluirConta={perfil.excluirConta}
            senha={perfil.senha}
            setSenha={perfil.setSenha}
        />

    )
}