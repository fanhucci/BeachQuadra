'use client'
import CustomInput from "@/components/customInput";
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 space-y-8">

                <Link href="/" className="text-gray-600">
                    <ArrowLeft />
                </Link>

                <div className="text-center space-y-2">
                    

                    <h1 className="text-3xl font-semibold text-gray-800">
                        Redefinir senha
                    </h1>
                    <p className="text-sm text-gray-500">
                        Informe o e-mail associado a conta abaixo!
                    </p>
                </div>

    
                <form className="flex flex-col gap-6">

           
                <CustomInput
                    label="E-mail"
                    name="email"
                    value={email}
                    erro={erros.email}
                    onChange={(e=>{
                        setEmail(e.target.value)
                    })}
                />

                <div className="flex justify-between text-sm">
                    <Link href="/cadastro" className="text-blue-600 hover:underline">
                    Criar conta
                    </Link>

                    <Link href="/login" className="text-gray-500 hover:underline">
                    Login
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={procurarConta}
                    className="
                    mt-2 h-12 rounded-xl
                    bg-blue-600 text-white font-semibold
                    hover:bg-blue-700 active:scale-[.99]
                    transition
                    "
                >
                    Enviar
                </button>

                </form>
            </div>
        </div>
    )
}