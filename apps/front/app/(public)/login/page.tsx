'use client'
import CustomInput from "@/components/customInput";
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { LoginDTO, LoginSchema } from "@app/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

export default function LoginPage(){
    const router = useRouter();
    const estadoInicial = { email:"", senha:"" };

    const [formData,setFormData] = useState(estadoInicial);
    const [erros,setErros] = useState<Partial<LoginDTO>>({});
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
            setErros(parse.error.flatten().fieldErrors);
            return;
        }

        try {
            
            await apiRequest(`/login`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })
            await refreshUser();
            router.push('/perfil');
        } catch (error) {
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
                    Bem-vindo de volta
                </h1>
                <p className="text-sm text-gray-500">
                    Acesse sua conta para fazer suas reservas!
                </p>
                </div>

    
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
                        placeholder="senha"
                        name="senha"
                        onChange={handleChange}
                        value={formData.senha}
                        erro={erros.senha}
                        type="password"
                    />

                    <div className="flex justify-between text-sm">
                        <Link href="/cadastro" className="text-blue-600 hover:underline">
                        Criar conta
                        </Link>

                        <Link href="/esqueci-senha" className="text-gray-500 hover:underline">
                        Esqueci a senha
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={fazerLogin}
                        className="
                        mt-2 h-12 rounded-xl
                        bg-blue-600 text-white font-semibold
                        hover:bg-blue-700 active:scale-[.99]
                        transition
                        "
                    >
                        Entrar
                    </button>

                </form>
            </div>
        </div>
    )
}