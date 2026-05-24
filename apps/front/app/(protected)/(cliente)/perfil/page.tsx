'use client'

import PerfilPage from "@/components/perfil/perfilPage";
import { useEffect, useState } from "react";
import NaoEncontrado from "@/components/erros/naoEncontrado";
import { useUser } from "@/context/userContext";


export default function MeuPerfilPage(){

    const {user} = useUser();
    const [idUsuario,setIdUsuario] = useState<number|null>(null);

    useEffect(()=>{
        const idNumerico = Number(user?.id_pessoa);
        
        if(!isNaN(idNumerico) && idNumerico>0){
            setIdUsuario(idNumerico);
        }
    },[user])
    

    if(!idUsuario) return <NaoEncontrado/>

    return (
        <PerfilPage id_perfil={idUsuario}/>
    )
}