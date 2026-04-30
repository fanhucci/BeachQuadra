
import { AlterarSenhaDTO, AlterarStatusContaDTO, CriarContaDTO,EsqueciSenhaDTO } from "@app/shared";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import sql from "../infra/db";
import PessoaRepository from "../repositories/pessoaRepository";
import { enviarEmail } from "../infra/email/emailHandler";
import redefinirSenhaTemplate from "../infra/email/redefinirSenha";
import jwt from "jsonwebtoken";

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

        const tokenRedefinirSenha = jwt.sign({
            id_pessoa:pessoa.id_pessoa,
            motivo:'redefinir_senha'
            },
            process.env.JWT_SECRET!,
            { expiresIn:'5m'}
        );

        const link = `${process.env.FRONT_URL}/redefinir-senha?=${tokenRedefinirSenha}`
        
        await enviarEmail({
            to:pessoa.email,
            subject:"Redefinição de senha",
            html:redefinirSenhaTemplate(link),
        })

    }
}