
import { AlterarSenhaDTO, AlterarStatusContaDTO, CriarContaDTO } from "@app/shared";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import sql from "../public/db";

export default class ContaService{
    private repo = new ContaRepository();

    // async listarContas(filtro:ContaQueryDTO){
    //     return await this.repo.listarContas(filtro);
    // }

    async adicionarConta(dados:CriarContaDTO){

        const senhaHash = await bcrypt.hash(dados.senha,10);

        return await this.repo.adicionarConta(sql,{
            ...dados,
            senha:senhaHash
        });
    }

    async alterarSenha(dados:AlterarSenhaDTO){

        const senhaHash = await bcrypt.hash(dados.senha,10);

        return await this.repo.alterarSenha({
            ...dados,
            senha:senhaHash
        });
        
    }

    async alterarStatus(status:AlterarStatusContaDTO){
        
        const resposta =  await this.repo.alterarStatus(status);console.log(resposta);return resposta
    }
}