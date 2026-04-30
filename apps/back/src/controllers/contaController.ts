import { Request, Response } from 'express';
import { AlterarSenhaSchema, AlterarStatusContaSchema, CriarContaSchema, EsqueciSenhaSchema,ResetarSenhaSchema } from "@app/shared";
import ContaService from '../services/contaService';

export default class ContaController{
    private service = new ContaService();

    async adicionarConta(req:Request, res:Response){
       
        const parse = CriarContaSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
        const resposta = await this.service.adicionarConta(parse.data);

        return res.status(201).json(resposta);
    }

    async alterarStatus(req:Request, res:Response){
        
        const parse = AlterarStatusContaSchema.safeParse({id_conta:req.params.id});

        if(!parse.success) return res.status(400).json({erro:"Id inválido"});

        const resposta = await this.service.alterarStatus(parse.data);

        return res.status(200).json(resposta);
    }

    async alterarSenha(req:Request, res:Response){

        const parse = AlterarSenhaSchema.safeParse(req.body);
        
        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        //const resposta = await this.service.alterarSenha(parse.data);
        const resposta = {message:'interditado'}
        return res.status(200).json(resposta);
    }

    async resetarSenha(req:Request, res:Response){
        const parse = ResetarSenhaSchema.safeParse(req.body);
        console.log(parse.data)
        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const resposta = await this.service.resetarSenha(parse.data);

        return res.status(200).json(resposta);
    }

    async esqueciSenha(req:Request, res:Response){
        const parse = EsqueciSenhaSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        await this.service.esqueciSenha(parse.data);
        
        return res.sendStatus(200);
    }

}