import { PessoaQueryDTO } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";

export default class UsuarioService{

    private pessoa = new PessoaRepository();
    
    async listarUsuarios(filtro:PessoaQueryDTO){
        return await this.pessoa.listarUsuarios(filtro);
    }

    async listarUsuarioPorId(id_logado:number,id_busca:number){

        const usuario = await this.pessoa.listarUsuarioPorId(id_busca);
        
        const isOwner = id_logado === id_busca

        //const isClient = false;
        //const isAdmin =  isClient && true;

        const resposta = {
            usuario,
            permissions:{
                canEdit: isOwner,
                canChangePassword: isOwner,
                canResetPassword: !isOwner,
                canActivateAccount: !isOwner,
                canDeactivateAccount: !isOwner,
                canDelete: isOwner,
            }
        }
        return resposta;
    }

}