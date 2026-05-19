'use client'

import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";
import CustomInput from "@/components/inputsComponents/customInput";
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { LoginDTO, LoginSchema } from "@app/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react"
import { toast } from "sonner";

export default function LoginPage(){
    
    return(
        <section className="bg-gray-100 flex flex-1 justify-center items-center">

            <div className="bg-white w-full max-w-md  shadow-2xl rounded-3xl p-10 space-y-8">

                <div className="felx flex-row gap-4">

                    <LinkButton
                        estilo="fantasma"
                        className="w-fit bg-none hover:bg-none"
                        href={'/'}
                    >
                        <span>
                            <ArrowLeft/>    
                        </span>
                    </LinkButton>
                
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-semibold text-gray-800">
                            Bem-vindo de volta
                        </h1>
                        <p className="text-sm text-gray-500">
                            Acesse sua conta para fazer suas reservas!
                        </p>
                    </div>

                </div>
                

                <Suspense fallback={
                        <div className="flex justify-center py-4">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                        </div>
                }>
                    <LoginForm/>
                </Suspense>
    
            </div>
        </section>
    )
}

function LoginForm(){

    const router = useRouter();
    const params = useSearchParams();
    const callbackURL = params.get('callback');

    const estadoInicial = { email:"", senha:"" };

    const [formData,setFormData] = useState(estadoInicial);
    const [erros,setErros] = useState<Partial<Record<keyof LoginDTO, string>>>({});
    const {refreshUser} = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }


    async function fazerLogin(){
        const parse = LoginSchema.safeParse(formData);

        if(!parse.success){
            setErros(formatarErrosZod(parse.error));
            return;
        }

        try {
            
            await apiRequest(`/login`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })
            await refreshUser();

            
            router.replace(callbackURL ?? '/perfil');
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    return(
        <form className="flex flex-col gap-6">

            <CustomInput
                label="E-mail"
                placeholder="seu@email.com"
                name="email"
                onChange={handleChange}
                value={formData.email}
                erro={erros.email}
            />

            <CustomInput
                label="Senha"
                placeholder="******"
                name="senha"
                onChange={handleChange}
                value={formData.senha}
                erro={erros.senha}
                type="password"
            />
                    
            <div className="flex justify-between text-sm">
                <Link href={callbackURL? `/cadastro?callback=${callbackURL}` : '/cadastro'} className="text-blue-600 hover:underline">
                Criar conta
                </Link>
                <Link href="/esqueci-senha" className="text-gray-500 hover:underline">
                    Esqueci a senha
                </Link>
            </div>

            <SubmitButton
                type="submit"
                onClick={fazerLogin}
                className="w-fit"
                estilo="primario"
            >
                <span>Entrar</span>
            </SubmitButton>

        </form>
    )
}