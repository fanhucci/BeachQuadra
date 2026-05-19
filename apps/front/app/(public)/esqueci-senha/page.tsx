'use client'
import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";
import CustomInput from "@/components/inputsComponents/customInput";
import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { EsqueciSenhaDTO, EsqueciSenhaSchema } from "@app/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react"
import { toast } from "sonner";

export default function EsqueciSenhaPage(){
    const [email,setEmail] = useState<string>("");
    const [erros,setErros] = useState<Partial<Record<keyof EsqueciSenhaDTO,string>>>({});

    async function procurarConta() {
        const parse = EsqueciSenhaSchema.safeParse({email});

        if(!parse.success){
            setErros(formatarErrosZod(parse.error))
            return;
        }

        try {
            await apiRequest(`/contas/esqueci-senha`,{
                method:'POST',
                body:JSON.stringify(parse.data)
            })
            setErros({});
            toast.success('Se existir uma conta com esse e-mail, enviaremos instruções de redefinição!');
            
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
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

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Recuperação de senha
                    </h1>
                    <p className="text-sm text-gray-500">
                        Informe o e-mail associado a conta abaixo
                    </p>
                </div>

    
                <form className="flex flex-col gap-6">

                    <CustomInput
                        label="E-mail"
                        name="email"
                        placeholder="seu@email.com"
                        value={email}
                        erro={erros.email}
                        onChange={(e=>{
                            setEmail(e.target.value)
                        })}
                    />

                    <div className="flex w-full justify-between text-sm">
                        <Link href="/cadastro" className="text-blue-600 hover:underline">
                        Criar conta
                        </Link>

                        <Link href="/login" className="text-gray-500 hover:underline">
                        Entrar
                        </Link>
                    </div>

                    <SubmitButton
                        type="submit"
                        onClick={procurarConta}
                        className="w-fit"
                        estilo="primario"
                    >
                        <span>Enviar</span>
                    </SubmitButton>
                </form>
            </div>
        </section>
    )
}