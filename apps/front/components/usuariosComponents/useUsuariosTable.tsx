'use client'
import { Column } from "@/components/customTable";
import LinkButton from "@/components/buttonComponents/linkButton";
import SubmitButton from "@/components/buttonComponents/submitButton";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import { Usuario } from "@app/shared";
import { CalendarPlus,Pencil, UserCheck, UserMinus, UserSearch } from "lucide-react";
import { useMemo } from "react";

type AcoesUsuario = {
    editar:(user:Usuario)=>(void);
    ativar:(id:number)=>(void);
    desativar:(id:number)=>(void);
}

export default function useUsuariosTable(acoes:AcoesUsuario){

    const cargos: Record<number,string> = {
        1:'Cliente',
        2:'Funcionário',
        3:'Administrador'
    }

    const colunas = useMemo<Column<Usuario>[]>(()=>[
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
            render: (_:any, usuario:Usuario) => (
                <div className="flex justify-center gap-2">
    
                    <LinkButton 
                        href={`/usuarios/${usuario.id_pessoa}`} 
                        estilo="fantasma"
                    >
                        <UserSearch size={18} />
                        <span className="hidden lg:inline">Perfil</span>
                    </LinkButton>


                    <LinkButton 
                        href={`/reservas/cadastrar/${usuario.id_pessoa}`} 
                        estilo="primario"
                    >
                        <CalendarPlus size={18} />
                        <span className="hidden xl:inline">Reserva</span>
                    </LinkButton>

                    <SubmitButton 
                        onClick={() => acoes.editar(usuario)}
                        estilo="secundario"
                        title="Editar Usuário"
                    >
                        <Pencil size={18} />
                    </SubmitButton>

                    {usuario.ativo ? (
                        <SubmitButton 
                            onClick={() => acoes.desativar(usuario.id_pessoa)}
                            estilo='perigo'
                            title="Desativar"
                        >
                            <UserMinus size={18} />
                        </SubmitButton>
                        ) : (
                        <SubmitButton 
                            onClick={() => acoes.ativar(usuario.id_pessoa)}
                            estilo="secundario"
                            className="text-green-500 hover:bg-green-50 p-2 rounded-md"
                            title="Ativar"
                        >
                            <UserCheck size={18} />
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