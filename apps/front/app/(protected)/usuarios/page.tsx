'use client'

import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import useFilter from "@/hooksGenericos/useFilter";
import usePageCrud from "@/hooksGenericos/usePageCrud";
import { EditarUsuarioSchema, NovoUsuarioSchema, Usuario, UsuarioSearch } from "@app/shared";
import useUsuariosTable from "./useUsuariosTable";
import SubmitButton from "@/components/submitButton";
import { Plus } from "lucide-react";
import CustomInput from "@/components/customInput";


export default function UsuariosPage(){
    const {queryString, filters, handleFilters} = useFilter<UsuarioSearch>({
        search:'',
        tipo:"nome",
        id_cargo:1,
        ativo:true
    });

    const {
        loading,
        buttonLoading,

        dados,
        formData,
        erros,

        modalOn,
        editionOn,

        adicionar,
        editar,
        ativar,
        desativar,

        handleChange,
        abrirEdicao,
        abrirModal,
        fecharModal

    } = usePageCrud<Usuario>({
        idKey:'id_pessoa',
        endpoint:'usuarios',
        filtro: queryString,
        criarSchema: NovoUsuarioSchema,
        editarSchema: EditarUsuarioSchema
    });

    const {colunas} = useUsuariosTable({
        editar:abrirEdicao,
        ativar:ativar,
        desativar:desativar
    });

    return(
        <main className="flex flex-col flex-1 p-6 gap-4">

            <div>
                <SubmitButton
                    estilo="primario"
                    onClick={abrirModal}
                >
                    <Plus /> Novo Usuário
                </SubmitButton>
            </div>

            <div>Filtros</div>

            <CustomTable
                columns={colunas}
                data={dados}
                isLoading={loading}
                
            />

            <CustomModal
                titulo={
                    editionOn
                    ? 'Editar'
                    : 'Cadastrar'
                }
                estado={modalOn}
                fechar={fecharModal}
                size="2xl"
                botoes={[
                    {
                        label:'Cancelar',
                        estilo:'secundario',
                        onClick:fecharModal,
                        isLoading:buttonLoading
                    },
                    {
                        label:editionOn
                            ? 'Editar'
                            : 'Cadastrar',
                        estilo:'primario',
                        onClick:editionOn
                            ? editar
                            : adicionar,
                        isLoading:buttonLoading
                    },

                ]}

            >
                <UsuarioForm
                    formData={formData}
                    erros={erros}
                    handleChange={handleChange}
                />
            </CustomModal>

        </main>
    );
}


interface UsuarioFormProps{
    formData:Partial<Usuario>;
    erros:Partial<Record<keyof Usuario, string>>;
    handleChange:(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>void;
}

function UsuarioForm({
    formData,
    erros,
    handleChange,
}:UsuarioFormProps){
    return(
        <div className="flex flex-col gap-3">
              <CustomInput
                    label="Nome"
                    name="nome"
                    onChange={handleChange}
                    value={formData.nome}
                    erro={erros.nome}
                    type="text"
                />

                <CustomInput
                    label="CPF"
                    name="cpf"
                    onChange={handleChange}
                    value={formData.cpf}
                    erro={erros.cpf}
                    type="cpf"
                />

                <CustomInput
                    label="E-mail"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    erro={erros.email}
                    type="email"
                />

                <CustomInput
                    label="Telefone"
                    name="telefone"
                    onChange={handleChange}
                    value={formData.telefone}
                    erro={erros.telefone}
                    type="tel"
                />

                <div className="flex flex-col gap-1">
                    <label htmlFor="id_cargo" className="text-sm text-gray-600">
                        Cargo
                    </label>
                
                    <select
                        id="id_cargo"
                        name="id_cargo"
                        value={formData.id_cargo}
                        onChange={handleChange}
                        className={`
                        border rounded-lg h-10 px-3 bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                        transition
                        ${erros.id_cargo ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                        `}
                    >
                        <option value="0" disabled>
                            Selecione um cargo...
                        </option>
                        <option value={1}>Cliente</option>
                        <option value={2}>Funcionário</option>
                        <option value={3}>Administrador</option>
                    </select>
                
                    {erros.id_cargo && (
                        <p className="text-xs text-red-500">
                            {erros.id_cargo}
                        </p>
                    )}
                </div>
        </div >
    );
}