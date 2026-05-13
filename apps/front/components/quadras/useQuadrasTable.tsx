'use client'
import { Column } from "@/components/customTable";
import LinkButton from "@/components/linkButton";
import SubmitButton from "@/components/submitButton";
import { dinheiroMask } from "@/utils/mascaras";
import { Quadra } from "@app/shared";
import { Pencil, RotateCcw, Trash } from "lucide-react";
import { useMemo } from "react";

type AcoesQuadra = {
    editar:(quadra:Quadra)=>(void);
    ativar:(id:number)=>(void);
    desativar:(id:number)=>(void);
}

export default function useQuadrasTable(acoes:AcoesQuadra){

    const colunas = useMemo<Column<Quadra>[]>(()=>[
        { key: "nome", label: "Nome" },
        { key: "tipo", label: "Tipo",},
        { key: "valor", label: "Valor",
            render:(value:string)=>(dinheiroMask(value))
        },
        { 
            key:"status", label: "Status",
            render:(value:boolean)=>value? 'Disponível' : 'Indisponível'
            
        },
        { 
            key:"ativo", label: "Ativo",
            render:(value:boolean)=>value? 'Ativa' : 'Inativa'
            
        },
        { 
            key: "ações", label: "Ações", align:"center",
            render: (_:any, quadra:Quadra) => (
                <div className="flex justify-center gap-2">
    
                    <LinkButton 
                        href={`/quadras/${quadra.id_quadra}`} 
                        estilo="primario"
                    >
                        <span className="hidden lg:inline">Agenda</span>
                    </LinkButton>


                    <SubmitButton 
                        onClick={() => acoes.editar(quadra)}
                        estilo="secundario"
                        title="Editar Quadra"
                    >
                        <Pencil size={18} />
                    </SubmitButton>

                    {quadra.ativo ? (
                        <SubmitButton 
                            onClick={() => acoes.desativar(quadra.id_quadra)}
                            estilo='perigo'
                            title="Desativar"
                        >
                            <Trash size={18} />
                        </SubmitButton>
                        ) : (
                        <SubmitButton 
                            onClick={() => acoes.ativar(quadra.id_quadra)}
                            estilo="secundario"
                            className="text-green-500 hover:bg-green-50 p-2 rounded-md"
                            title="Ativar"
                        >
                            <RotateCcw size={18} />
                        </SubmitButton>
                    )}
                </div>
            )

        },

    ],[acoes]);

    return{
        colunas
    }
}