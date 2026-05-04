import { Permissions } from "@/components/usuarioPerfilForm";
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { ListarPessoaViewDTO } from "@app/shared";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useUsuario(id:number){

    const [usuario,setUsuario] = useState<ListarPessoaViewDTO|null>(null);
    const [permissions,setPermissions] = useState<Permissions| null>();
    const [loading,setLoading] = useState(true);
    const {user} = useUser();
    const router = useRouter();

    async function carregar() {
        try{
            setLoading(true);

            const data = await apiRequest(`/usuarios/${id}`);

            setUsuario(data.usuario);
            setPermissions(data.permissions)

        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
        finally{
            setLoading(false);
        }
    }

    async function ativarUsuario() {
        
        if(!usuario)return;

        try {
            await apiRequest(`/pessoas/${usuario.id_pessoa}/status`,{
                method:"PATCH",
                body:JSON.stringify({
                    status:true
                })
            })
            carregar();
            toast.success("Usuario ativado com sucesso.")
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function desativarUsuario() {
        
        if(!usuario)return;

        try {
            await apiRequest(`/pessoas/${usuario.id_pessoa}/status`,{
                method:"PATCH",
                body:JSON.stringify({
                    status:false
                })
            })
            carregar();
            toast.success("Usuario desativado com sucesso.")
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function redefinirSenha(){
        await apiRequest(`/`,{
            method:"POST",
            body:JSON.stringify(usuario?.id_conta)
        })
    }

    useEffect(()=>{
        
        carregar();
        
        if(id === Number(user?.id_pessoa)) router.replace("/perfil");
    },[id])

    return{
        usuario,
        permissions,
        loading,
        ativarUsuario,
        desativarUsuario,
        redefinirSenha
    }
}