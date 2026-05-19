'use client'
import CustomInput from "@/components/inputsComponents/customInput";
import useCadastro from "./useCadastro"
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";

export default function CadastroPage(){

    return (
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
                
                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">Criar Conta</h1>

                <Suspense fallback={
                    <div className="flex justify-center py-4">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                }>

                    <CadastroForm/>
                
                </Suspense>
                
            </div>
        </section>
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
        <form
            onSubmit={cadastrarUsuario} 
            className="flex flex-col items-center justify-center gap-6"
        >

            <CustomInput
                label="Nome"
                placeholder="seu nome"
                name="nome"
                value={formData.nome}
                erro={erros.nome}
                onChange={handleChange}
                type="text"
            />

            <CustomInput
                label="CPF"
                placeholder="___.___.___.__"
                name="cpf"
                value={cpfMask(formData.cpf)}
                erro={erros.cpf}
                onChange={handleChange}
                type="cpf"
            />

            <CustomInput
                label="E-mail"
                placeholder="seu@email.com"
                name="email"
                value={formData.email}
                erro={erros.email}
                onChange={handleChange}
                type="email"
            />

            <CustomInput
                label="Telefone"
                name="telefone"
                placeholder="(99)9999-99999"
                value={telefoneMask(formData.telefone)}
                erro={erros.telefone}
                onChange={handleChange}
                type="tel"
            />

            <CustomInput
                label="Senha"
                placeholder="******"
                name="senha"
                type="password"
                value={formData.senha}
                erro={erros.senha}
                onChange={handleChange}
            />
                    
            <div className="flex w-full justify-between text-sm">
                <Link href={callbackURL? `/login?callback=${callbackURL}` : `/login`} className="text-blue-600 hover:underline">
                    Voltar ao login
                </Link>
            </div>

            <SubmitButton
                type="submit"
                className="w-fit"
                estilo="primario"
            >
                <span>Entrar</span>
            </SubmitButton>

        </form>
    )
}