'use client'

import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";
import CustomInput from "@/components/inputsComponents/customInput";
import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { ResetarSenhaDTO, ResetarSenhaSchema } from "@app/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function resetarSenhaPage(){
    const { token } = useParams<{ token: string }>();
    
    const router = useRouter();

    const estadoInicial = {
        senha:"",
        senhaConfirmar:"",
        token:token,
    }

    const [formData,setFormData] = useState<ResetarSenhaDTO>(estadoInicial);
    const [erros,setErros] = useState<Partial<Record<keyof ResetarSenhaDTO, string>>>({});

    async function alterarSenha(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const parse = ResetarSenhaSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        try {
            await apiRequest(`/contas/resetar-senha`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })
            toast.success('Senha redefinida com sucesso!');
            router.push('/login');
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    return(
        <section className="bg-gray-100 flex flex-1 justify-center items-center">
            <div className="relative bg-white w-full max-w-md  shadow-2xl rounded-3xl p-10 space-y-8">
                
                <LinkButton
                    estilo="fantasma"
                    className="absolute left-0 top-1 w-fit bg-transparent!"
                    href={'/'}
                >
                    <span>
                        <ArrowLeft/>    
                    </span>
                </LinkButton>
                
                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">Redefinir senha</h1>

                <form 
                    onSubmit={alterarSenha}
                    className="flex flex-col items-center justify-center gap-5"
                >

                    <CustomInput
                        label="Senha"
                        placeholder="******"
                        name="senha"
                        value={formData.senha}
                        erro={erros.senha}
                        onChange={handleChange}
                        type="password"
                    />

                    <CustomInput
                        label="Confirmar senha"
                        placeholder="******"
                        name="senhaConfirmar"
                        value={formData.senhaConfirmar}
                        erro={erros.senhaConfirmar}
                        onChange={handleChange}
                        type="password"
                    />

                    <SubmitButton
                        type="submit"
                        className="w-fit"
                        estilo="primario"
                    >
                        <span>Entrar</span>
                    </SubmitButton>

                </form>

            </div>
        </section>
    )
}