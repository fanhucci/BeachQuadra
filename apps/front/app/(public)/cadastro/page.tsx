
import CustomInput from "@/components/customInput";
import useCadastro from "./useCadastro"

export default function CadastroPage(){
    const cadastro = useCadastro();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-2xl font-semibold text-center mb-8 text-gray-700">Criar Conta</h1>

                <div className="flex flex-col gap-5">

                    <CustomInput
                        label="Nome"
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

                    <button
                        onClick={cadastro.cadastrarUsuario}
                        className="mt-4 h-11 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">Cadastrar</button>
                </div>
            </div>
        </div>
    );

}