'use client'

import CustomTableTeste from "@/components/teste";
import LoadingSpinner from "@/components/LoadingSpinner";
import CustomModal from "@/components/customModal";
import CustomInput from "@/components/customInput";
import { dinheiroMask } from "@/utils/mascaras";
import usePageCrud from "../usuarios/usePageCrud";
import { Quadra, NovaQuadraSchema, EditarQuadraSchema } from "@app/shared";
import { useMemo } from "react";

export default function TestePage(){

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
        idKey:"id_quadra"
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

    if(loading) return <LoadingSpinner/>


    return(
        <div>
            <button onClick={abrirModal}>abrir modal</button>
            <CustomTableTeste
                columns={columns}
                data={dados}        
            />

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
                            onClick={editar}>Editar</button>
                        : <button 
                            disabled={buttonLoading} 
                            onClick={adicionar}>Adicionar</button>
                }
            </CustomModal>
        </div>


    )
}