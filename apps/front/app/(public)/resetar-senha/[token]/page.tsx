'use client'

import CustomInput from "@/components/customInput";
import { apiRequest } from "@/utils/apiHandler";
import { formatarErrosZod } from "@/utils/zodErrorHandler";
import { ResetarSenhaDTO, ResetarSenhaSchema } from "@app/shared";
import { ArrowLeft, Link } from "lucide-react";
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

    async function alterarSenha(){
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 space-y-8">
                <Link href="/" className="text-gray-600">
                    <ArrowLeft />
                </Link>
                
                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">Redefinir senha</h1>

                <div className="flex flex-col gap-5">

                    <CustomInput
                        label="Senha"
                        name="senha"
                        value={formData.senha}
                        erro={erros.senha}
                        onChange={handleChange}
                    />

                    <CustomInput
                        label="Confirmar senha"
                        name="senhaConfirmar"
                        value={formData.senhaConfirmar}
                        erro={erros.senhaConfirmar}
                        onChange={handleChange}
                    />


                    <button
                        onClick={alterarSenha}
                        className="mt-4 h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Confirmar
                    </button>
                </div>

            </div>
        </div>
    )
}