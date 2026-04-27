'use client'
import { useParams } from "next/navigation";
import { useUsuario } from "./useUsuario";
import UsuarioPerfilForm from "@/components/usuarioPerfilForm";


export default function UsuarioPerfilPage(){

    const {id} = useParams();
    const user = useUsuario(Number(id));

    if(user.loading) return <p>Carregando...</p>

    if(!user.usuario || !user.permissions) return null;
    
    return (
        <UsuarioPerfilForm 
            usuario={user.usuario}
            permissions={user.permissions}
            ativarConta={user.ativarUsuario}
            desativarConta={user.desativarUsuario}
            redefinirSenha={user.redefinirSenha}
        />
    )
}