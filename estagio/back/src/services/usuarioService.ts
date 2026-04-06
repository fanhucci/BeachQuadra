import { EditarUsuarioDTO, NovoUsuarioDTO, UsuarioDTO } from "@shared/schemas/usuarioSchema";
import UsuarioRepository from "../repositories/usuarioRepository";

export default class UsuarioService{
    private repo = new UsuarioRepository();

    async listarUsuarios(){
        return await this.repo.listarUsuarios();
    }

    async adicionarUsuario(usuario:NovoUsuarioDTO){
        return await this.repo.adicionarUsuario(usuario);
    }

    async editarUsuario(usuario:EditarUsuarioDTO){
        return await this.repo.editarUsuario(usuario);
    }

    async excluirUsuario(id:number){
        return await this.repo.excluirUsuario(id);
    }
}