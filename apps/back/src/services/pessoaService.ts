


import { AlterarPessoaDTO, CriarPessoaDTO, PessoaQueryDTO } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";
import sql from "../infra/db";


export default class PessoaService{
    private repo = new PessoaRepository();

    async adicionarPessoa(dados:CriarPessoaDTO){
        return await this.repo.adicionarPessoa(sql,dados);
    }

    async editarPessoa(dados:AlterarPessoaDTO){
        return await this.repo.editarPessoa(dados);
    }

    async alterarStatus(id:number,status:boolean){
        return await this.repo.alterarStatus(id,status);
    }


}