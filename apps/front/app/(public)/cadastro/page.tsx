'use client'
import CustomInput from "@/components/customInput";
import useCadastro from "./useCadastro"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CadastroPage(){
    const cadastro = useCadastro();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 space-y-8">
                <Link href="/" className="text-gray-600">
                    <ArrowLeft />
                </Link>
                
                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">Criar Conta</h1>

                <div className="flex flex-col gap-5">

                    <CustomInput
                        label="Nome"
                        placeholder="seu nome"
                        name="nome"
                        value={cadastro.formData.nome}
                        erro={cadastro.erros.nome}
                        onChange={cadastro.handleChange}
                    />

                    <CustomInput
                        label="CPF"
                        name="cpf"
                        value={cadastro.formData.cpf}
                        erro={cadastro.erros.cpf}
                        onChange={cadastro.handleChange}
                    />

                    <CustomInput
                        label="E-mail"
                        placeholder="seu@email.com"
                        name="email"
                        value={cadastro.formData.email}
                        erro={cadastro.erros.email}
                        onChange={cadastro.handleChange}
                    />

                    <CustomInput
                        label="Telefone"
                        name="telefone"
                        value={cadastro.formData.telefone}
                        erro={cadastro.erros.telefone}
                        onChange={cadastro.handleChange}
                    />

                    <CustomInput
                        label="Senha"
                        name="senha"
                        type="password"
                        value={cadastro.formData.senha}
                        erro={cadastro.erros.senha}
                        onChange={cadastro.handleChange}
                    />

                    <div className="flex justify-between text-sm">
                        <Link href="/login" className="text-blue-600 hover:underline">
                            Voltar ao login
                        </Link>
                    </div>

                    <button
                        onClick={cadastro.cadastrarUsuario}
                        className="mt-4 h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Cadastrar
                    </button>
                </div>

            </div>
        </div>
    );

}