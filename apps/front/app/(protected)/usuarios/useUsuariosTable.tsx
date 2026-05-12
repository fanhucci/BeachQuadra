'use client'
import LinkButton from "@/components/linkButton";
import SubmitButtom from "@/components/submitButton";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import { Usuario } from "@app/shared";
import { Info, Pencil, Plus, Trash } from "lucide-react";
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
            key: "ações", label: "Ações", align:"center",
            render:(_:any, usuario:Usuario)=>(
                <div className="flex gap-2">
                    <SubmitButtom 
                        estilo="primario"
                        onClick={() => acoes.editar(usuario)}
                    >
                        Editar <Pencil />
                    </SubmitButtom>
                    {
                        usuario.ativo
                        ?<SubmitButtom
                            estilo="perigo"
                            onClick={() => acoes.desativar(usuario.id_pessoa)}>Desativar <Trash /></SubmitButtom>
                        :<SubmitButtom 
                            estilo="secundario"    
                            onClick={() => acoes.ativar(usuario.id_pessoa)}>Ativar</SubmitButtom>
                    }

                    <LinkButton
                        href={`/usuarios/${usuario.id_pessoa}`}    
                    >
                        <Info/> Perfil
                    </LinkButton>
                    <LinkButton
                        href={`/reservas/cadastrar/${usuario.id_pessoa}`}
                        estilo="primario"
                    >
                        <Plus/> Nova Reserva
                    </LinkButton>
                </div>
            )
        },

    ],[acoes]);

    return{
        colunas
    }
}