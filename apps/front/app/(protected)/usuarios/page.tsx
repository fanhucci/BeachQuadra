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
import CustomSelect from "@/components/customSelect";


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

            <div className="flex gap-2 p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-gray-500">Filtros:</div>
                    
                    <div className="flex flex-wrap items-center gap-3 bg-white ">
                        <CustomInput
                            name="search"
                            onChange={handleFilters}
                            value={filters.search}
                            type="text"
                        />

                        <CustomSelect
                            name="tipo"
                            options={[
                                {value:'nome',label:'Nome'},
                                {value:'cpf',label:'CPF'},
                                {value:'email',label:'E-mail'},
                            ]}
                            value={filters.tipo}
                            onChange={(name, val) => {
                                handleFilters({
                                    target: { name, value: val }
                                } as any);
                            }}                
                        />

                        <CustomSelect
                            name="id_cargo"
                            options={[
                                { value:"", label:'Todos'},
                                { value: "1", label: 'Cliente' },
                                { value: "2", label: 'Funcionário' },
                                { value: "3", label: 'Administrador' }
                            ]}
                            value={filters.id_cargo ?? ""}
                            onChange={(name, val) => {
                                handleFilters({
                                    target: { name, value: val }
                                } as any);
                            }}                
                        />

                        <CustomSelect
                            name="ativo"
                            options={[
                                { value:"", label:'Todos'},
                                { value: "true", label: 'Ativos' },
                                { value: "false", label: 'Desativados' },
                            ]}
                            value={filters.ativo ?? ""}
                            onChange={(name, val) => {
                                handleFilters({
                                    target: { name, value: val }
                                } as any);
                            }}                
                        />

                    </div>

            </div>

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

const opcoesCargo = [
    { value: 1, label: 'Cliente' },
    { value: 2, label: 'Funcionário' },
    { value: 3, label: 'Administrador' }
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-2">
            <div className="md:col-span-2">
                <CustomSelect
                    label="Cargo"
                    name="id_cargo"
                    options={opcoesCargo}
                    value={formData.id_cargo || ""}
                    erro={erros.id_cargo}
                    onChange={(name, val) => {
                        handleChange({
                            target: { name, value: val }
                        } as any);
                    }}
                />
            </div>

            <div className="md:col-span-2"> 
                <CustomInput
                    label="Nome"
                    name="nome"
                    onChange={handleChange}
                    value={formData.nome}
                    erro={erros.nome}
                    type="text"
                />
            </div>

            <CustomInput
                label="CPF"
                name="cpf"
                onChange={handleChange}
                value={formData.cpf}
                erro={erros.cpf}
                type="cpf"
            />

            <CustomInput
                label="Telefone"
                name="telefone"
                onChange={handleChange}
                value={formData.telefone}
                erro={erros.telefone}
                type="tel"
            />


            <div className="md:col-span-2">
                <CustomInput
                    label="E-mail"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    erro={erros.email}
                    type="email"
                />
            </div>
                
            
        </div >
    );
}