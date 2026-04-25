import { PessoaQueryDTO } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";

export default class UsuarioService{

    private pessoa = new PessoaRepository();
    
    async listarUsuarios(filtro:PessoaQueryDTO){
        return await this.pessoa.listarUsuarios(filtro);
    }

    async listarUsuarioPorId(id:number){
        return await this.pessoa.listarUsuarioPorId(id);
    }

}