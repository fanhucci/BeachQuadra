'use client'
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { LoginDTO, LoginSchema } from "@app/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";

export default function LoginPage(){
    const router = useRouter();
    const estadoInicial = { email:"", senha:"" };

    const [formData,setFormData] = useState(estadoInicial);
    const [erros,setErros] = useState<Partial<LoginDTO>>({});
    const {login} = useUser();

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
            
            router.push('/');
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 space-y-8">

            
                <div className="text-center space-y-2">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Bem-vindo de volta
                </h1>
                <p className="text-sm text-gray-500">
                    Acesse sua conta para fazer suas reservas!
                </p>
                </div>

    
                <form className="flex flex-col gap-6">

           
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm text-gray-600">
                    E-mail
                    </label>

                    <input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`
                        border rounded-xl h-12 px-4 text-sm
                        focus:outline-none focus:ring-2
                        transition
                        ${erros.email
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-500"}
                    `}
                    />

                    {erros.email && (
                    <p className="text-xs text-red-500">{erros.email}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="senha" className="text-sm text-gray-600">
                    Senha
                    </label>

                    <input
                    id="senha"
                    name="senha"
                    type="password"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`
                        border rounded-xl h-12 px-4 text-sm
                        focus:outline-none focus:ring-2
                        transition
                        ${erros.senha
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-500"}
                    `}
                    />

                    {erros.senha && (
                    <p className="text-xs text-red-500">{erros.senha}</p>
                    )}
                </div>

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