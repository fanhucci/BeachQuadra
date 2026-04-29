import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { CadastrarUsuarioDTO, CadastrarUsuarioSchema } from "@app/shared";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

export default function useCadastro(){
    const estado_inicial:CadastrarUsuarioDTO = {
        id_cargo:1,
        cpf:"",
        email:"",
        nome:"",
        senha:"",
        telefone:"",
    }

    const [formData,setFormData] = useState<CadastrarUsuarioDTO>(estado_inicial);
    const [erros,setErros] = useState<Partial<Record<keyof CadastrarUsuarioDTO,string>>>({});

    const router = useRouter();

    async function cadastrarUsuario(){

        const parse = CadastrarUsuarioSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        try {
            await apiRequest(`usuario/cadastro`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })  
            setErros({});
            router.push(`/perfil`);
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){

        const {name, value} = e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }));
    }

    return{
        formData,
        erros,
        handleChange,
        cadastrarUsuario
    }
}