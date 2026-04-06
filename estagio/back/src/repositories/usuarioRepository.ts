import { EditarUsuarioDTO, NovoUsuarioDTO } from "@shared/schemas/usuarioSchema";
import sql from "../public/db";

export default class UsuarioRepository{

    async adicionarUsuario(usuario:NovoUsuarioDTO){
        return await sql`insert into usuarios (usuario, senha, cargo) values (${usuario.usuario}, ${usuario.senha}, ${usuario.cargo}) returning *`
    }

    async excluirUsuario(id:number){
        return await sql`delete from usuarios where id_usuario = ${id}`;
    }

    async editarUsuario(usuario:EditarUsuarioDTO){
        return await sql`update usuarios set usuario = ${usuario.usuario}, senha = ${usuario.senha}, cargo = ${usuario.cargo} where id_usuario = ${usuario.id} returning *`;
    }

    async listarUsuarios(){
        return await sql`select * from usuarios order by id_usuario`
    }
}