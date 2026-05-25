import { Request, Response } from 'express';
import { AlterarSenhaPerfilSchema, AlterarStatusContaSchema, CriarContaSchema, EsqueciSenhaSchema,ResetarSenhaSchema, ForcarRedefinirSenhaSchema } from "@app/shared";
import ContaService from '../services/contaService';

export default class ContaController{
    private service = new ContaService();

    // async adicionarConta(req:Request, res:Response){
       
    //     const parse = CriarContaSchema.safeParse(req.body);

    //     if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
    //     const resposta = await this.service.adicionarConta(parse.data);

    //     return res.status(201).json(resposta);
    // }

    // async alterarStatus(req:Request, res:Response){
        
    //     const parse = AlterarStatusContaSchema.safeParse({id_conta:req.params.id});

    //     if(!parse.success) return res.status(400).json({erro:"Id inválido"});

    //     const resposta = await this.service.alterarStatus(parse.data);

    //     return res.status(200).json(resposta);
    // }

    async alterarMinhaSenha(req:Request, res:Response){

        const parse = AlterarSenhaPerfilSchema.safeParse(req.body);
        const id = Number(req.user?.id);
        
        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        const resposta = await this.service.alterarMinhaSenha(id,parse.data);
       
        return res.sendStatus(204);
    }

    async resetarSenha(req:Request, res:Response){
        const parse = ResetarSenhaSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        await this.service.resetarSenha(parse.data);

        return res.sendStatus(204);
    }

    async resetarSenhaPorAdmin(req:Request, res:Response){
        const parse = ForcarRedefinirSenhaSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        await this.service.resetarSenhaAdmin(parse.data);

        return res.sendStatus(204);
    }

    async esqueciSenha(req:Request, res:Response){
        const parse = EsqueciSenhaSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        await this.service.esqueciSenha(parse.data);
        
        return res.sendStatus(204);
    }

}