import { Request, Response } from 'express';
import { AlterarSenhaSchema, AlterarStatusContaSchema, CriarContaSchema } from "@app/shared";
import ContaService from '../services/contaService';

export default class ContaController{
    private service = new ContaService();

    // async listarContas(req:Request, res:Response){
   
    //     const parse = ListarContaSchema.safeParse(req.query);

    //     if(!parse.success) return res.status(400).json({erro: parse.error.message})

    //     const contas = await this.service.listarContas(parse.data);
   
    //     res.json(contas);
        
    // }

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
        console.log(JSON.stringify(resposta))
        return res.status(200).json(resposta);
    }

    async alterarSenha(req:Request, res:Response){

        const parse = AlterarSenhaSchema.safeParse(req.body);
        
        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        const resposta = await this.service.alterarSenha(parse.data);

        return res.status(200).json(resposta);
    }

    async redefinirSenha(req:Request, res:Response){
        
    }

    async recuperarSenha(req:Request, res:Response){
        
    }

}