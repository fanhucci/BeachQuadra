
import { AlterarStatusContaDTO, CriarContaDTO,EsqueciSenhaDTO,ResetarSenhaDTO,ForcarRedefinirSenhaDTO } from "@app/shared";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import sql from "../infra/db";
import { enviarEmail } from "../infra/email/emailHandler";
import redefinirSenhaTemplate from "../infra/email/templates/redefinirSenha";
import AppError from "../infra/appError";
import crypto from 'crypto';
import ResetTokenRepository from "../repositories/resetTokenRepository";
import senhaRedefinidaPorAdminTemplate from "../infra/email/templates/resetarSenha";

export default class ContaService{
    private conta = new ContaRepository();
    private resetSenha = new ResetTokenRepository();

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

    // async alterarSenha(dados:AlterarSenhaDTO){

    //     const senhaHash = await bcrypt.hash(dados.senha,10);

    //     return await this.conta.alterarSenhaPorId(dados.id_pessoa, senhaHash);
        
    // }

    async alterarStatus(status:AlterarStatusContaDTO){
        
        const resposta =  await this.conta.alterarStatus(status);
        return resposta
    }

    async resetarSenha(dados: ResetarSenhaDTO){

        await this.resetSenha.removerTokensExpirados();

        const registros = await this.resetSenha.procurarTokensValidos();

        for( const r of registros) {
            const ok = await bcrypt.compare(dados.token,r.token_hash);

            if(!ok) continue;

            const senhaHash = await bcrypt.hash(dados.senha, 10);
            await this.conta.alterarSenhaPorId(r.id_conta, senhaHash);

            await this.resetSenha.deletarToken(r.id_conta);
            
            return;
        }

        throw new AppError('Token inválido ou expirado', 400);
        
    }

    async resetarSenhaAdmin(dados:ForcarRedefinirSenhaDTO){
        const senhaFake = crypto.randomBytes(32).toString('hex');
        const senhaHash = await bcrypt.hash(senhaFake,10)

        const {email} = await this.conta.alterarSenhaPorId(dados.id_conta,senhaHash);

        if(!email) throw new AppError('Erro ao resetar senha',404);
        console.log(email)
        await enviarEmail({
            to:email,
            subject:"Reset de senha",
            html:senhaRedefinidaPorAdminTemplate(),
        })
    }

    async esqueciSenha(dados:EsqueciSenhaDTO){

        const conta = await this.conta.buscarContaPorEmail(dados.email);

        if(!conta){
            return;
        }

        await this.resetSenha.removerTokensExpirados();
        
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(token,10);

        await this.resetSenha.criarToken(conta.id_conta,tokenHash);

        const link = `${process.env.FRONT_URL}/resetar-senha/${token}`
        
        await enviarEmail({
            to:dados.email,
            subject:"Redefinição de senha",
            html:redefinirSenhaTemplate(link),
        })

    }
}