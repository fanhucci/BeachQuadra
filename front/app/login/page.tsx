'use client'
import { useUser } from "@/context/userContext";
import { apiRequest } from "@/utils/apiHandler";
import { LoginDTO, LoginSchema } from "@app/shared";
import { useState } from "react"
import { toast } from "sonner";

export default function LoginPage(){

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
            const {token} = await apiRequest(`/login`,{
                method:"POST",
                body:JSON.stringify(parse.data)
            })
            login(token);
            window.location.href = "/";
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-10">

                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">
                    Acesso ao Sistema
                </h1>

                <form className="flex flex-col gap-6">

        
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm text-gray-600">
                            E-mail
                        </label>

                        <input
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            className={`
                                border rounded-lg h-11 px-3 text-sm
                                focus:outline-none focus:ring-2
                                transition
                                ${erros.email 
                                    ? "border-red-500 focus:ring-red-400" 
                                    : "border-gray-300 focus:ring-blue-400"}
                            `}
                        />

                        {erros.email && (
                            <p className="text-xs text-red-500">
                                {erros.email}
                            </p>
                        )}
                    </div>

    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="senha" className="text-sm text-gray-600">
                            Senha
                        </label>

                        <input
                            id="senha"
                            type="password"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className={`
                                border rounded-lg h-11 px-3 text-sm
                                focus:outline-none focus:ring-2
                                transition
                                ${erros.senha 
                                    ? "border-red-500 focus:ring-red-400" 
                                    : "border-gray-300 focus:ring-blue-400"}
                            `}
                        />

                        {erros.senha && (
                            <p className="text-xs text-red-500">
                                {erros.senha}
                            </p>
                        )}
                    </div>

             
                    <button
                        type="button"
                        onClick={fazerLogin}
                        className="
                            mt-2 h-11 rounded-lg
                            bg-blue-600 text-white font-medium
                            hover:bg-blue-700
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