'use client'
import { useParams } from "next/navigation";
import { useUsuario } from "./useUsuario";
import UsuarioPerfilForm from "@/components/usuarioPerfilForm";
import PerfilPage from "@/components/perfil/perfilPage";
import { useEffect, useState } from "react";


export default function UsuarioPerfilPage(){

    const {id} = useParams();
    const [idUsuario,setIdUsuario] = useState<number|null>(null);
    useEffect(()=>{
        const idNumerico = Number(id);

        if(!isNaN(idNumerico) && idNumerico>0){
            setIdUsuario(idNumerico);
        }
    },[id])
    
    if(!idUsuario) return <>Carregando</>
    
    return (
        // <UsuarioPerfilForm 
        //     usuario={user.usuario}
        //     permissions={user.permissions}
        //     ativarConta={user.ativarUsuario}
        //     desativarConta={user.desativarUsuario}
        //     redefinirSenha={user.redefinirSenha}
        // />
        <PerfilPage id_perfil={idUsuario}/>
    )
}