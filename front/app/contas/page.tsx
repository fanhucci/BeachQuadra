'use client'

import CustomButtom from "@/components/customButton";
import CustomModal from "@/components/customModal";
import CustomTable from "@/components/customTable";
import { apiRequest } from "@/utils/apiHandler";
import { EditarContaSchema, NovaContaDTO, NovoContaSchema, ContaDTO } from "@app/shared";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export default function ContasPage(){
    const estadoInicial:NovaContaDTO = {
        id_conta:null,
        conta:"",
        senha:"",
        cargo:0
    }

    const columns = [
        { key: "conta", label: "Conta" },
        { key: "cargo", label: "Cargo" },
        { key: "ativo", label: "Status" },
        { key: "ações", label: "Ações" },
    ];

    const cargoLabels = {
        "1":"Cliente",
        "2":"Funcionário",
        "3":"Administrador",
    }

    const [modalAberta,setModalAberta] = useState(false);
    const [contas,setContas] = useState([]);
    const [formData,setFormData] = useState<a>(estadoInicial);
    const [erros,setErros] = useState<a>({});
    const [filters, setFilters] = useState({
        search: "",
        cargo: "",
        status: "",
    });

    const handleChange = (e) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }

    useEffect(()=>{
        listarContas();
    },[]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            listarContas();
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters.search, filters.cargo, filters.status]);

    useEffect(()=>{
        if(!modalAberta){
            setFormData(estadoInicial);
            setErros({});
        }
    },[modalAberta]);


    async function listarContas(){
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.cargo) params.append("cargo", filters.cargo);
        if (filters.status !== "") params.append("status", filters.status);

        try {
            const data = await apiRequest(`/contas?${params.toString()}`);
            const tabela = data.map((conta: ContaDTO) => ({
                conta: conta.conta,
                cargo: cargoLabels[conta.cargo],
                ativo: conta.ativo ? "Ativo" : "Inativo",
                ações: (
                    <div className="inline-flex justify-center gap-2">
                        <CustomButtom funcao={() => abrirEdicao(conta)} texto="editar" tipo="secundario" />
                        {conta.ativo
                            ?<CustomButtom funcao={() => excluirConta(conta.id_conta)} texto="excluir" tipo="danger" />
                            :<CustomButtom funcao={() => ativarConta(conta.id_conta)} texto="ativar" tipo="terciario" />
                        }
                    </div>
                ),
            }));
            setContas(tabela);
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    function abrirEdicao(conta:ContaDTO){
        setFormData({...conta,senha:""});
        setModalAberta(true);
    }

    async function salvarConta(){

        const parse = formData.id_conta
            ? EditarContaSchema.safeParse(formData)
            : NovoContaSchema.safeParse(formData);

        if (!parse.success) {
            setErros(parse.error.flatten().fieldErrors);
            return;
        }
        
        try {
            await apiRequest(formData.id_conta? `/contas/${formData.id_conta}`: "/contas",{
                method: formData.id_conta? "PUT":"POST",
                body:JSON.stringify(parse.data)
            })
            toast.success(formData.id_conta
                ? `Alteração realizada`: "Cadastro concluído")
            setModalAberta(false);
            listarContas();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function excluirConta(id:number){
        try {
            await apiRequest(`/contas/${id}`,{
                method:"DELETE"
            })
            toast.success("Usuário excluído")
            listarContas();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function ativarConta(id:number) {
        try {
            await apiRequest(`/contas/${id}`,{
                method:"PATCH"
            })
            toast.success("Usuário ativado")
            listarContas();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    

   return (
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
                        value={filters.cargo}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, cargo: e.target.value }))
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
                        value={filters.status}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                        }
                    >
                        <option value="">Todos</option>
                        <option value="true">Ativos</option>
                        <option value="false">Inativos</option>
                    </select>
                </div>

            </div>

            {contas.length > 0 ? (
            <CustomTable data={contas} columns={columns} />
            ) : (
            <div className="flex justify-center p-10 text-gray-500">
                Nenhuma conta cadastrado
            </div>
            )}

            <CustomModal aberta={modalAberta} fechar={() => setModalAberta(false)}>
                <div className="flex flex-col w-80 p-6 gap-5">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="conta" className="text-sm text-gray-600">
                            Usuário
                        </label>

                        <input
                            id="conta"
                            value={formData.conta}
                            onChange={handleChange}
                            className={`
                            border rounded-lg h-10 px-3
                            focus:outline-none focus:ring-2 focus:ring-blue-400
                            transition
                            ${erros.conta ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                            `}
                        />

                        {erros.conta && (
                            <p className="text-xs text-red-500">
                            {erros.conta}
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
                        className={`
                        border rounded-lg h-10 px-3
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                        transition
                        ${erros.senha ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                        `}
                    />

                    {erros.senha && (
                        <p className="text-xs text-red-500">
                        {erros.senha}
                        </p>
                    )}
                    </div>


                    <div className="flex flex-col gap-1">
                    <label htmlFor="cargo" className="text-sm text-gray-600">
                        Cargo
                    </label>

                    <select
                        id="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                        className={`
                        border rounded-lg h-10 px-3 bg-white
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                        transition
                        ${erros.cargo ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                        `}
                    >
                        <option value="0" disabled>
                        Selecione um cargo...
                        </option>
                        <option value="1">Cliente</option>
                        <option value="2">Funcionário</option>
                        <option value="3">Administrador</option>
                    </select>

                    {erros.cargo && (
                        <p className="text-xs text-red-500">
                        {erros.cargo}
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
                        funcao={salvarConta}
                        texto="Salvar"
                        tipo="terciario"
                    />
                    </div>

                </div>
            </CustomModal>

        </div>
    );
}

