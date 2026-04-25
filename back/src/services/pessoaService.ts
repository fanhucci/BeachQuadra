


import { AlterarPessoaDTO, CriarPessoaDTO, PessoaQueryDTO } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";


export default class PessoaService{
    private repo = new PessoaRepository();

    async adicionarPessoa(dados:CriarPessoaDTO){
        return await this.repo.adicionarPessoa(dados);
    }

    async editarPessoa(dados:AlterarPessoaDTO){
        return await this.repo.editarPessoa(dados);
    }

    async alterarStatus(id:number){
        return await this.repo.alterarStatus(id);
    }


}