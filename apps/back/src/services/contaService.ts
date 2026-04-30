
import { AlterarSenhaDTO, AlterarStatusContaDTO, CriarContaDTO,EsqueciSenhaDTO,ResetarSenhaDTO } from "@app/shared";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import sql from "../infra/db";
import { enviarEmail } from "../infra/email/emailHandler";
import redefinirSenhaTemplate from "../infra/email/templates/redefinirSenha";
import jwt from "jsonwebtoken";
import AppError from "../infra/appError";

type ResetTokenPayload = {
    id_conta:number;
    motivo:string;
}

export default class ContaService{
    private conta = new ContaRepository();

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

        return await this.conta.alterarSenhaPorId(dados.id_pessoa, senhaHash);
        
    }

    async alterarStatus(status:AlterarStatusContaDTO){
        
        const resposta =  await this.conta.alterarStatus(status);
        return resposta
    }

    
    async resetarSenha(dados: ResetarSenhaDTO) {
        let token: ResetTokenPayload;

        try {
            token = jwt.verify(
                dados.token,
                process.env.JWT_SECRET!
            ) as ResetTokenPayload;
        } catch {
            throw new AppError('Token inválido ou expirado', 401);
        }

        if (token.motivo !== 'resetar-senha') {
            throw new AppError('Token inválido', 401);
        }

        const senhaHash = await bcrypt.hash(dados.senha, 10);

        return await this.conta.alterarSenhaPorId(token.id_conta, senhaHash);
    }

    async esqueciSenha(dados:EsqueciSenhaDTO){

        const conta = await this.conta.buscarContaPorEmail(dados.email);

        if(!conta.id_conta){
            //criar conta sem senha "", é impossivel entrar com conta com menos de 6 caracteres e esse fluxo ja é o de redefinir senha
        }
        if(!conta){
            return;
        }

        const tokenResetarSenha = jwt.sign({
            id_conta:conta.id_conta,
            motivo:'resetar_senha'
            },
            process.env.JWT_SECRET!,
            { expiresIn:'5m'}
        );

        const link = `${process.env.FRONT_URL}/resetar-senha?token=${tokenResetarSenha}`
        
        await enviarEmail({
            to:dados.email,
            subject:"Redefinição de senha",
            html:redefinirSenhaTemplate(link),
        })

    }
}