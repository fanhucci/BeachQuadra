'use client'
import SubmitButtom from "@/components/submitButton";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import { Usuario } from "@app/shared";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type AcoesUsuario = {
    editar:(user:Usuario)=>(void);
    ativar:(id:number)=>(void);
    desativar:(id:number)=>(void);
}

export default function useUsuariosTable(acoes:AcoesUsuario){
    const router = useRouter();

    const cargos: Record<number,string> = {
        1:'Cliente',
        2:'Funcionário',
        3:'Administrador'
    }

    const colunas = useMemo(()=>[
        { key: "nome", label: "Nome" },
        { 
            key: "cpf", label: "CPF",
            render:(value:string)=>(cpfMask(value))
        },
        { key: "email", label: "E-mail"},
        { 
            key: "telefone", label: "Telefone",
            render:(value:string)=>(telefoneMask(value))
        },
        {
            key:'id_cargo', label:"Cargo",
            render:(value:number)=>cargos[value]
        },
        { 
            key:"ativo", label: "Conta",
            render:(value:boolean)=>value? 'Ativa' : 'Inativa'
            
        },
        { 
            key: "ações", label: "Ações",
            render:(_:any, usuario:Usuario)=>(
                <div className="felx gap-2">
                    <SubmitButtom 
                        
                        onClick={() => acoes.editar(usuario)}
                    >
                        Editar
                    </SubmitButtom>
                    {
                        usuario.ativo
                        ?<SubmitButtom onClick={() => acoes.desativar(usuario.id_pessoa)}>Desativar</SubmitButtom>
                        :<SubmitButtom onClick={() => acoes.ativar(usuario.id_pessoa)}>Ativar</SubmitButtom>
                    }

                    
                    <SubmitButtom onClick={()=>router.push(`/usuarios/${usuario.id_pessoa}`)}>Detalhes</SubmitButtom>
                    <SubmitButtom onClick={()=>router.push(`/reservas/cadastrar/${usuario.id_pessoa}`)}>Nova reserva</SubmitButtom>
                </div>
            )
        },

    ],[acoes]);

    return{
        colunas
    }
}