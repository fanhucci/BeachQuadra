'use client'

import CustomButtom from "@/components/customButton";
import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import { apiRequest } from "@/utils/apiHandler";
import { AlterarPessoaDTO, AlterarPessoaSchema, CriarPessoaDTO, CriarPessoaSchema, ListarPessoaViewDTO } from "@app/shared";
import Link from "next/link";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function UsuarioPage(){

    const columns = [
        { key:"nome", label:"Nome"},
        { key:"cpf", label:"CPF"},
        { key:"email", label:"E-mail"},
        { key:"telefone", label:"Telefone"},
        { key:"cargo", label:"Cargo"},
        { key:"id_conta", label:"Conta"},
        { key:"ativo", label:"Estado"},
        { key:"acoes", label:"Ações"},
    ]



    const estadoInicial:AlterarPessoaDTO = {
        id_pessoa:null,
        nome:"",
        cpf:"",
        email:"",
        telefone:"",
        id_cargo:0,
        ativo:true
    }

    const [formData,setFormData] = useState<CriarPessoaDTO|AlterarPessoaDTO>(estadoInicial);
    const [modalAberta,setModalAberta] = useState<boolean>(false);
    const [usuarios,setUsuarios] = useState<ListarPessoaViewDTO[]>([]);
    const [erros,setErros] = useState<CriarPessoaDTO|AlterarPessoaDTO>({});
    const [filters,setFilters] = useState({
        search:"",
        tipo:"1",
        id_cargo:"",
        ativo:""
    });

    const handleChange = (e) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }

    useEffect(()=>{
        listarUsuarios();
    },[])

    useEffect(() => {
        const timeout = setTimeout(() => {
            listarUsuarios();
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters.search, filters.tipo, filters.id_cargo, filters.ativo]);

    useEffect(()=>{
        if(!modalAberta){
            setFormData(estadoInicial);
            setErros({});
        }
    },[modalAberta]);

    async function listarUsuarios(){
        const params = new URLSearchParams();
        if(filters.search) params.append("search",filters.search);
        if(filters.tipo)params.append("tipo",filters.tipo);
        if(filters.id_cargo)params.append("id_cargo",filters.id_cargo);
        if(filters.ativo)params.append("ativo",filters.ativo);
        try{
            const data = await apiRequest(`/usuarios?${params.toString()}`);
            const tabela = data.map((usuario:ListarPessoaViewDTO)=>({
                nome:usuario.nome,
                cpf:usuario.cpf,
                email:usuario.email,
                telefone:usuario.telefone,
                cargo:usuario.cargo,
                id_conta:(
                    <Link href={`/usuarios/${usuario.id_pessoa}`}>Detalhes</Link>
                ),
                ativo: usuario.ativo ? "Ativo" : "Inativo",
                acoes:(
                    <div className="inline-flex justify-center gap-2">
                        <CustomButtom funcao={() => abrirEdicao(usuario)} texto="editar" tipo="secundario" />
                        <CustomButtom funcao={() => alterarEstado(usuario.id_pessoa)} texto={usuario.ativo? "Desativar": "Ativar"} tipo={usuario.ativo? "danger": "terciario"} />
                    </div>
                )
            }))
            setUsuarios(tabela);

        }
        catch(error){
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }   

    async function salvarUsuario(){
        console.log(formData)
        const parse = formData.id_pessoa
        ? AlterarPessoaSchema.safeParse(formData)
        : CriarPessoaSchema.safeParse(formData) ;

        if(!parse.success){
            setErros(parse.error.flatten().fieldErrors);
            return;
        }

        try {
            await apiRequest(formData.id_pessoa? `/pessoas/${formData.id_pessoa}`: "/pessoas",{
                method: formData.id_pessoa? "PATCH":"POST",
                body:JSON.stringify(parse.data)
            });

            toast.success(formData.id_pessoa
                ? `Alteração realizada`
                : "Cadastro concluído");
            setModalAberta(false);
            listarUsuarios();
        } 
        catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    function abrirEdicao(dados:AlterarPessoaDTO){
        setFormData(dados);
        setModalAberta(true);
        console.log("formData", formData);
    }

    async function alterarEstado(id:number) {
        try {
            await apiRequest(`/pessoas/${id}/status`,{
                method:"PATCH"
            });
            listarUsuarios();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    return(
        <div className="flex flex-col flex-1 p-6 gap-4">
            <div className="flex items-center justify-between">
                        
                <h1 className="text-xl font-semibold text-gray-800">Usuários</h1>

                <CustomButtom
                    funcao={() => setModalAberta(true)}
                    texto="Novo Usuário"
                    tipo="terciario"
                />
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-gray-500">Filtros:</div>
                
                <div className="flex flex-wrap items-center gap-3 bg-white ">
                    <input
                    className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 h-10 text-sm
                    focus:outline-none focus:ring-2
                    transition"
                    type="text"
                    placeholder="Pesquisar conta..."
                    value={filters.search}
                    onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                    }
                    />

                    <select
                        className="border border-gray-200 rounded-lg px-3 h-10 text-sm bg-white
                        focus:outline-none focus:ring-2
                        transition"
                        value={filters.tipo}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, tipo: e.target.value }))
                        }
                    >
                        <option value="1">Nome</option>
                        <option value="2">CPF</option>
                        <option value="3">E-mail</option>
                    </select>

                    <select
                        className="border border-gray-200 rounded-lg px-3 h-10 text-sm bg-white
                        focus:outline-none focus:ring-2
                        transition"
                        value={filters.id_cargo}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, id_cargo: e.target.value }))
                        }
                    >
                        <option value="">Todos cargos</option>
                        <option value="1">Cliente</option>
                        <option value="2">Funcionário</option>
                        <option value="3">Administrador</option>
                    </select>

                    <select
                        className="border border-gray-200 rounded-lg px-3 h-10 text-sm bg-white
                        focus:outline-none focus:ring-2 
                        transition"
                        value={filters.ativo}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, ativo: e.target.value }))
                        }
                    >
                        <option value="">Todos</option>
                        <option value="true">Ativos</option>
                        <option value="false">Inativos</option>
                    </select>
                </div>

            </div>

            {usuarios.length > 0 ? (
                <CustomTable data={usuarios} columns={columns} />
            ) : (
                <div className="flex justify-center p-10 text-gray-500">
                    Nenhuma usuário cadastrado
                </div>
            )}
            
            <CustomModal aberta={modalAberta} fechar={() => setModalAberta(false)}>
                <div className="flex flex-col w-80 p-6 gap-5">
            
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nome" className="text-sm text-gray-600">
                            Nome
                        </label>
            
                        <input
                            id="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className={`
                            border rounded-lg h-10 px-3
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                            transition
                            ${erros.nome ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                            `}
                        />
            
                        {erros.nome && (
                            <p className="text-xs text-red-500">
                                {erros.nome}
                            </p>
                        )}
                    </div>
            
                    <div className="flex flex-col gap-1">
                        <label htmlFor="cpf" className="text-sm text-gray-600">
                            CPF
                        </label>
            
                        <input
                            id="cpf"
                            type="text"
                            value={formData.cpf}
                            onChange={handleChange}
                            className={`
                            border rounded-lg h-10 px-3
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                            transition
                            ${erros.cpf ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                            `}
                        />
            
                        {erros.cpf && (
                            <p className="text-xs text-red-500">
                                {erros.cpf}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm text-gray-600">
                            E-mail
                        </label>
            
                        <input
                            id="email"
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            className={`
                            border rounded-lg h-10 px-3
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                            transition
                            ${erros.email ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                            `}
                        />
            
                        {erros.email && (
                            <p className="text-xs text-red-500">
                                {erros.email}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="telefone" className="text-sm text-gray-600">
                            Telefone
                        </label>
            
                        <input
                            id="telefone"
                            type="text"
                            value={formData.telefone}
                            onChange={handleChange}
                            className={`
                            border rounded-lg h-10 px-3
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                            transition
                            ${erros.telefone ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                            `}
                        />
            
                        {erros.telefone && (
                            <p className="text-xs text-red-500">
                                {erros.telefone}
                            </p>
                        )}
                    </div>
            
            
                    <div className="flex flex-col gap-1">
                        <label htmlFor="id_cargo" className="text-sm text-gray-600">
                            Cargo
                        </label>
            
                        <select
                            id="id_cargo"
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
            
                    <div className="flex justify-center gap-2 pt-2">
                        <CustomButtom
                            funcao={() => setModalAberta(false)}
                            texto="Cancelar"
                            tipo="danger"
                        />
                        <CustomButtom
                            funcao={salvarUsuario}
                            texto="Salvar"
                            tipo="terciario"
                        />
                    </div>
            
                </div>
            </CustomModal>

        </div>
    )
}