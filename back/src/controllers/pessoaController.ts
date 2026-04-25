import { Request, Response } from 'express';
import { AlterarPessoaSchema, CriarPessoaSchema, PessoaQuerySchema,  } from "@app/shared";
import PessoaService from '../services/pessoaService';


export default class PessoaController{
    private service = new PessoaService();

    async listarPessoas(req:Request, res:Response){
        
        const parse = PessoaQuerySchema.safeParse(req.query);
        
        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        const pessoas = await this.service.listarPessoas(parse.data);

        res.json(pessoas);

    }

    async adicionarPessoa(req:Request, res:Response){
      
        const parse = CriarPessoaSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
        const resposta = await this.service.adicionarPessoa(parse.data);

        return res.status(201).json(resposta);

    }

    async editarPessoa(req:Request,res:Response){
        const parse = AlterarPessoaSchema.safeParse({
            id_pessoa:Number(req.params.id),
            ...req.body
        });

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const resposta = await this.service.editarPessoa(parse.data);

        return res.status(200).json(resposta);

    }

    async alterarStatus(req:Request, res:Response){
        const id = Number(req.params.id);

        const resposta = await this.service.alterarStatus(id);

        return res.status(200).json(resposta);
    }

}