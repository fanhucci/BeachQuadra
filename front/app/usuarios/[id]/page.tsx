'use client'
import { useParams } from "next/navigation";
import { useUsuarioPerfil } from "./useUsuarioPerfil";
import UsuarioPerfilForm from "@/components/usuarioPerfilForm";


export default function UsuarioPerfilPage(){

    const {id} = useParams();
    const {usuario,loading,alterarStatus,redefinirSenha} = useUsuarioPerfil(Number(id));

    if(loading) return <p>Carregando...</p>

    return (
        <UsuarioPerfilForm
            usuario={usuario}
            alterarStatus={alterarStatus}
            redefinirSenha={redefinirSenha}
        />
    )
}