'use client'
import { useParams } from "next/navigation";
import PerfilPage from "@/components/perfil/perfilPage";
import { useEffect, useState } from "react";
import NaoEncontrado from "@/components/erros/naoEncontrado";


export default function UsuarioPerfilPage(){

    const {id} = useParams();
    const [idUsuario,setIdUsuario] = useState<number|null>(null);

    useEffect(()=>{
        const idNumerico = Number(id);
        
        if(!isNaN(idNumerico) && idNumerico>0){
            setIdUsuario(idNumerico);
        }
    },[id])
    

    if(!idUsuario) return <NaoEncontrado/>

    return (
        <PerfilPage id_perfil={idUsuario}/>
    )
}