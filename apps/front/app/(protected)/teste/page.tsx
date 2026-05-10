'use client'

import CustomTableTeste from "@/components/teste";
import useQuadra from "../quadras/useQuadra";
import LoadingSpinner from "@/components/LoadingSpinner";
import CustomModal from "@/components/customModal";
import CustomInput from "@/components/customInput";
import { dinheiroMask } from "@/utils/mascaras";

export default function TestePage(){

    const{
        loading,
        filtros,
        columns,
        quadras,
        formData,
        erros,
        modalOn,
        handleChange,
        setFiltros,
        adicionarQuadra,
        editarQuadra,
        abrirModal,
        fecharModal,
    } = useQuadra();

    if(loading) return <LoadingSpinner/>

    return(
        <div>
            <button onClick={abrirModal}>abrir modal</button>
            <CustomTableTeste
                columns={columns}
                data={quadras}        
            />

            <CustomModal
                aberta={modalOn}
                fechar={fecharModal}
            >
                <CustomInput
                    label="Nome"
                    name="nome"
                    onChange={(e)=>handleChange(e)}
                    value={formData.nome}
                    erro={erros.nome}
                    type="text"
                />


                <CustomInput
                    label="Valor"
                    name="valor"
                    onChange={(e)=>handleChange(e)}
                    value={dinheiroMask(formData.valor)}
                    erro={erros.valor}
                    type="text"
                />

       

                <button onClick={fecharModal}>Cancelar</button>
                <button onClick={adicionarQuadra}>Adicionar</button>
            </CustomModal>
        </div>


    )
}