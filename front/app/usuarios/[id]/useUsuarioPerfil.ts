import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useUsuarioPerfil(id:number){

    const [usuario,setUsuario] = useState(null);
    const [loading,setLoading] = useState(true);

    async function carregar() {
        try{
            const data = await apiRequest(`/usuarios/perfil`);
            setUsuario(data);
            setLoading(false);
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function alterarStatus() {
        alert(`Alterando status de ${id}...`)
    }

    async function redefinirSenha(){
        alert(`Redefinindo senha de ${id}...`)
    }

    useEffect(()=>{
        carregar();
    },[id])

    return{
        usuario,
        loading,
        alterarStatus,
        redefinirSenha
    }
}