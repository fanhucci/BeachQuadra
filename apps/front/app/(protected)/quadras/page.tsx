'use client'

import CustomButtom from "@/components/customButton";
import CustomModal from "@/components/customModal";
import CustomSwitch from "@/components/customSwitch";
import CustomTable from "@/components/customTable";
import { apiRequest } from "@/utils/apiHandler";
import { AdicionarQuadraDTO, ListarQuadraSchema, QuadraBaseSchema, QuadraDTO } from "@app/shared";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QuadrasPage(){
    const estadoInicial = {
        id_quadra:null,
        nome:"",
        tipo:"individual",
        status:true,
        valor:""
    }

    const columns = [
        { key: "nome", label: "Nome" },
        { key: "tipo", label: "Tipo" },
        { key: "status", label: "Status" },
        { key: "valor", label: "Valor" },
        { key:"ativo", label: "Ativo"},
        { key: "ações", label: "Ações" },
    ];

    const [modalAberta,setModalAberta] = useState(false);
    const [quadras,setQuadras] = useState([]);
    const [formData,setFormData] = useState(estadoInicial);
    const [erros,setErros] = useState<AdicionarQuadraDTO>({});
    const [filters, setFilters] = useState({
        search: "",
        tipo:"",
        status:"",
        ativo: "",
    });

    const handleChange = (e) =>{
        const {id,value} = e.target;

        setFormData(prev=>({
            ...prev,
            [id]:value
        }))
    }

    useEffect(()=>{
        listarQuadras()
    },[])

    useEffect(() => {
        const timeout = setTimeout(() => {
            listarQuadras();
        }, 400);

        return () => clearTimeout(timeout);
    }, [filters.search, filters.tipo, filters.ativo, filters.status]);

    useEffect(()=>{
        if(!modalAberta){
            setFormData(estadoInicial);
            setErros({});
        }
    },[modalAberta])


    async function listarQuadras(){
        const params = new URLSearchParams();
        if (filters.search) params.append("search", filters.search);
        if (filters.tipo) params.append("tipo", filters.tipo);
        if (filters.ativo !== "") params.append("ativo", filters.ativo);
        if (filters.status !== "") params.append("status", filters.status);

        try {
            const data = await apiRequest(`/quadras?${params.toString()}`);
            const tabela = data.map((quadra:QuadraDTO)=>({
                    nome: quadra.nome,
                    tipo: quadra.tipo,
                    valor: quadra.valor,
                    status:quadra.status ? "Disponível": "Indisponível",
                    ativo: quadra.ativo ? "Ativo" : "Inativo",
                    ações:(
                        <div className="inline-flex justify-center gap-2">
                            <CustomButtom funcao={()=>abrirEdicao(quadra)} texto={<Pencil size={16}/>} tipo="secundario" />
                            {quadra.ativo
                                ?<CustomButtom funcao={() => excluirQuadra(quadra.id_quadra)} texto="desativar" tipo="danger" />
                                :<CustomButtom funcao={() => ativarQuadra(quadra.id_quadra)} texto="ativar" tipo="terciario" />
                            }
                        </div>
                    )
                }));
            setQuadras(tabela);
                    
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    function abrirEdicao(quadra){
        setFormData(quadra);
        setModalAberta(true);
    }
    
    async function salvarQuadra() {
        
        const parse = formData.id_quadra
            ? ListarQuadraSchema.safeParse(formData)
            : QuadraBaseSchema.safeParse(formData);

        if (!parse.success) {
            setErros(parse.error.flatten().fieldErrors);
            return;
        }
     
        try {
            await apiRequest(formData.id_quadra? `/quadras/${formData.id_quadra}`: "/quadras", {
                method: formData.id_quadra? "PUT":"POST",
                body:JSON.stringify(parse.data)
            })
            toast.success(formData.id_quadra
                ? `Alteração realizada`: "Cadastro concluído")
            setModalAberta(false);
            listarQuadras();

        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function excluirQuadra(id:number) {
        try {
            await apiRequest(`/quadras/${id}`, {method:"DELETE"})
            toast.success("Quadra excluída")
            listarQuadras();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }

    async function ativarQuadra(id:number) {
        try {
            await apiRequest(`/quadras/${id}`, {method:"PATCH"})
            toast.success("Quadra ativada")
            listarQuadras();
        } catch (error) {
            toast.error(error instanceof Error? error.message : "Erro inesperado");
        }
    }
    


    return(
        <div className="flex flex-col flex-1 p-6 gap-4">
            <div className="flex items-center justify-between">
                        
                <h1 className="text-xl font-semibold text-gray-800">Quadras</h1>
            
                <CustomButtom
                    funcao={() => setModalAberta(true)}
                    texto="Nova Quadra"
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
                    placeholder="Pesquisar quadra..."
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
                        <option value="">Todos tipos</option>
                        <option value="dupla">Dupla</option>
                        <option value="individual">Individual</option>
     
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
                        <option value="">Todos status</option>
                        <option value="true">Disponível</option>
                        <option value="false">Indisponível</option>
     
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
           

            {
                quadras.length>0? 
                    <CustomTable data={quadras} columns={columns}/>
                :
                <div className="flex justify-center p-10 text-gray-500">
                    Nenhuma quadra cadastrada
                </div>
            }
            
            <CustomModal aberta={modalAberta} fechar={() => setModalAberta(false)}>
                <div className="flex flex-col w-80 p-6 gap-4">
                                
                    <div className="flex flex-col">
                        <label htmlFor="nome" className="text-gray-700  mb-1">Nome:</label>
                        <input id="nome" value={formData.nome} onChange={handleChange} 
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

                    <CustomSwitch 
                        estadoA={{label: 'Individual', value:'individual'}} 
                        estadoB={{label:'Duplas', value:'dupla'}} 
                        name="tipo" 
                        onChange={(valor) => handleChange({ target: { id: 'tipo', value: valor } } as any)} 
                        selected={formData.tipo}
                    />

                    <CustomSwitch 
                        estadoA={{label: 'Disponível', value:true}} 
                        estadoB={{label:'Indisponível', value:false}} 
                        name="status" 
                        onChange={(valor) => handleChange({ target: { id: 'status', value: valor } } as any)} 
                        selected={formData.status}
                    />
                    
            
                    <div className="flex flex-col">
                        <label htmlFor="valor" className="text-gray-700  mb-1">Valor:</label>
                        <input id="valor" value={formData.valor} onChange={handleChange} 
                        className={`
                        border rounded-lg h-10 px-3
                        focus:outline-none focus:ring-2 focus:ring-blue-400
                        transition
                        ${erros.valor ? "border-red-500 focus:ring-red-400" : "border-gray-300"}
                        `}
                        />
                        {erros.valor && (
                            <p className="text-xs text-red-500">
                            {erros.valor}
                            </p>
                        )}
                    </div>
            
                    <div className="flex justify-center gap-2">
                        <CustomButtom funcao={()=>setModalAberta(false)} texto={"cancelar"} tipo="danger"/>
                        <CustomButtom funcao={salvarQuadra} texto={"salvar"} tipo="terciario"/>
                    </div>
            
                </div>
            </CustomModal>
        </div>
    )
}