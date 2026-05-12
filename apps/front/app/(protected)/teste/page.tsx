'use client'

import CustomTableTeste from "@/components/teste";
import LoadingSpinner from "@/components/LoadingSpinner";
import CustomModal from "@/components/customModal";
import CustomInput from "@/components/customInput";
import { dinheiroMask } from "@/utils/mascaras";
import usePageCrud from "../../../hooksGenericos/usePageCrud";
import { Quadra, NovaQuadraSchema, EditarQuadraSchema, QuadraSearch } from "@app/shared";
import { useMemo } from "react";
import useFilter from "@/hooksGenericos/useFilter";
import CustomButtom from "@/components/customButton";

export default function TestePage(){

    const {queryString ,filters, handleFilters} = useFilter<QuadraSearch>({
        search:'',
        tipo:undefined,
        status:true,
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
        
    } = usePageCrud<Quadra>({
        endpoint:'quadras',
        criarSchema:NovaQuadraSchema,
        editarSchema:EditarQuadraSchema,
        idKey:"id_quadra",
        filtro:queryString
    });


    const columns = useMemo(() => [
            { key: "nome", label: "Nome" },
            { key: "tipo", label: "Tipo" },
            { 
                key: "valor", 
                label: "Valor", 
                render: (val: number) => dinheiroMask(val)
            },
            { 
                key: "status", 
                label: "Status",
                render: (status: boolean) => status ? "🟢 Disponível" : "🔴 Indisponível"
            },
            {
                key: "acoes",
                label: "Ações",
                render: (_: any, quadra: Quadra) => (
                    <div className="flex gap-2">
                        <button onClick={() => abrirEdicao(quadra)}>Editar</button>
                        {quadra.ativo 
                            ? <button onClick={() => ativar(quadra.id_quadra)}>Desativar</button>
                            : <button onClick={() => desativar(quadra.id_quadra)}>Ativar</button>
                        }
                    </div>
                )
            }
        ], [dados]);

    return(
        <div>
            <div className="flex items-center justify-between">
                                    
                <h1 className="text-xl font-semibold text-gray-800">Quadras</h1>
                        
                    <CustomButtom
                        funcao={abrirModal}
                        texto="Nova Quadra"
                        tipo="terciario"
                    />
                </div>
                        
                <div className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-gray-500">Filtros:
                            
                        <div className="flex flex-wrap items-center gap-3 bg-white ">
                            <input
                                className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 h-10 text-sm
                                focus:outline-none focus:ring-2
                                transition"
                                type="text"
                                placeholder="Pesquisar quadra..."
                                name="search"
                                value={filters.search}
                                onChange={handleFilters}
                            />
            
                            <select
                                className="border border-gray-200 rounded-lg px-3 h-10 text-sm bg-white
                                focus:outline-none focus:ring-2
                                transition"
                                value={filters.tipo}
                                name="tipo"
                                onChange={handleFilters}
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
                                name="status"
                                onChange={handleFilters}
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
                                name="ativo"
                                onChange={handleFilters}
                            >
                                <option value="">Todos</option>
                                <option value="true">Ativos</option>
                                <option value="false">Inativos</option>
                            </select>
                        </div>
            
                    </div>
                </div>
        
            {
                loading
                ?   <LoadingSpinner/>
                :   <CustomTableTeste
                        columns={columns}
                        data={dados}        
                    />
            }
            

            <CustomModal
                aberta={modalOn}
                fechar={fecharModal}
            >
                <CustomInput
                    label="Nome"
                    name="nome"
                    onChange={handleChange}
                    value={formData.nome ?? ''}
                    erro={erros.nome}
                    type="text"
                />


                <CustomInput
                    label="Valor"
                    name="valor"
                    onChange={handleChange}
                    value={dinheiroMask(formData.valor ?? 0)}
                    erro={erros.valor}
                    type="text"
                />

       

                <button onClick={fecharModal}>Cancelar</button>
                {
                    editionOn
                        ? <button
                            disabled={buttonLoading} 
                            onClick={editar}>Editar {JSON.stringify(buttonLoading)}</button>
                        : <button 
                            disabled={buttonLoading} 
                            onClick={adicionar}>Adicionar {JSON.stringify(buttonLoading)}</button>
                }
            </CustomModal>
        </div>


    )
}