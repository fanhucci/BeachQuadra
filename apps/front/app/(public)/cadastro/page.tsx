'use client'
import CustomInput from "@/components/inputsComponents/customInput";
import useCadastro from "./useCadastro"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function CadastroPage(){

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 space-y-8">
                <Link href="/" className="text-gray-600">
                    <ArrowLeft />
                </Link>
                
                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">Criar Conta</h1>

                <Suspense fallback={
                        <div className="flex justify-center py-4">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                        </div>
                    }>

                    <CadastroForm/>
                
                </Suspense>
                
            </div>
        </div>
    );

}

export function CadastroForm(){
    const {
        callbackURL,
        formData,
        erros,
        cadastrarUsuario,
        handleChange
    } = useCadastro();
    return(
        <div className="flex flex-col gap-5">

                    <CustomInput
                        label="Nome"
                        placeholder="seu nome"
                        name="nome"
                        value={formData.nome}
                        erro={erros.nome}
                        onChange={handleChange}
                    />

                    <CustomInput
                        label="CPF"
                        name="cpf"
                        value={formData.cpf}
                        erro={erros.cpf}
                        onChange={handleChange}
                    />

                    <CustomInput
                        label="E-mail"
                        placeholder="seu@email.com"
                        name="email"
                        value={formData.email}
                        erro={erros.email}
                        onChange={handleChange}
                    />

                    <CustomInput
                        label="Telefone"
                        name="telefone"
                        value={formData.telefone}
                        erro={erros.telefone}
                        onChange={handleChange}
                    />

                    <CustomInput
                        label="Senha"
                        name="senha"
                        type="password"
                        value={formData.senha}
                        erro={erros.senha}
                        onChange={handleChange}
                    />
                    
                    <div className="flex justify-between text-sm">
                        <Link href={callbackURL? `/login?=callback${callbackURL}` : `/login`} className="text-blue-600 hover:underline">
                            Voltar ao login
                        </Link>
                    </div>

                    <button
                        onClick={cadastrarUsuario}
                        className="mt-4 h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Cadastrar
                    </button>
                </div>
    )
}