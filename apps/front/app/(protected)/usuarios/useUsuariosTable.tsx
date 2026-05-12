'use client'
import LinkButton from "@/components/linkButton";
import SubmitButtom from "@/components/submitButton";
import { cpfMask, telefoneMask } from "@/utils/mascaras";
import { Usuario } from "@app/shared";
import { CalendarPlus, Info, Pencil, Plus, Trash, UserCheck, UserMinus, UserSearch } from "lucide-react";
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
            key: "ações", label: "Ações", align:'center',
            render: (_:any, usuario:Usuario) => (
                <div className="flex justify-around gap-2">
    
                    <SubmitButtom 
                        onClick={() => acoes.editar(usuario)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors"
                        title="Editar Usuário"
                    >
                        <Pencil size={18} />
                    </SubmitButtom>

                    
                    <LinkButton 
                        href={`/usuarios/${usuario.id_pessoa}`} 
                        estilo="fantasma"
                        className="!p-2" 
                    >
                        <UserSearch size={18} />
                        <span className="hidden lg:inline">Detalhes</span>
                    </LinkButton>


                    <LinkButton 
                        href={`/reservas/cadastrar/${usuario.id_pessoa}`} 
                        estilo="primario"
                        className="!py-2 !px-3"
                    >
                        <CalendarPlus size={18} />
                        <span className="hidden xl:inline">Nova Reserva</span>
                    </LinkButton>


                    {usuario.ativo ? (
                        <SubmitButtom 
                            onClick={() => acoes.desativar(usuario.id_pessoa)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-md"
                            title="Desativar"
                        >
                            <UserMinus size={18} />
                        </SubmitButtom>
                        ) : (
                        <SubmitButtom 
                            onClick={() => acoes.ativar(usuario.id_pessoa)}
                            className="text-green-500 hover:bg-green-50 p-2 rounded-md"
                            title="Ativar"
                        >
                            <UserCheck size={18} />
                        </SubmitButtom>
                    )}
                </div>
            )

        },

    ],[acoes]);

    return{
        colunas
    }
}