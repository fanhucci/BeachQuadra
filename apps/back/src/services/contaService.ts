
import { AlterarSenhaDTO, AlterarStatusContaDTO, CriarContaDTO,EsqueciSenhaDTO } from "@app/shared";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import sql from "../public/db";
import PessoaRepository from "../repositories/pessoaRepository";

export default class ContaService{
    private conta = new ContaRepository();
    private pessoa = new PessoaRepository();

    // async listarContas(filtro:ContaQueryDTO){
    //     return await this.repo.listarContas(filtro);
    // }

    async adicionarConta(dados:CriarContaDTO){

        const senhaHash = await bcrypt.hash(dados.senha,10);

        return await this.conta.adicionarConta(sql,{
            ...dados,
            senha:senhaHash
        });
    }

    async alterarSenha(dados:AlterarSenhaDTO){

        const senhaHash = await bcrypt.hash(dados.senha,10);

        return await this.conta.alterarSenha({
            ...dados,
            senha:senhaHash
        });
        
    }

    async alterarStatus(status:AlterarStatusContaDTO){
        
        const resposta =  await this.conta.alterarStatus(status);
        return resposta
    }

    async esqueciSenha(dados:EsqueciSenhaDTO){

        const pessoa = await this.pessoa.buscarPorEmail(dados.email);

        if(!pessoa) return;

        

    }
}