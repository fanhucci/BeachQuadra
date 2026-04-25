import { Request, Response } from 'express';
import QuadraService from '../services/quadraService';
import { QuadraQuerySchema, QuadraBaseSchema, ListarQuadraSchema} from '@app/shared';


export default class QuadraController{
    private service = new QuadraService();

    async listarQuadras(req:Request, res:Response){
        const parse = QuadraQuerySchema.safeParse(req.query);

        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        const usuarios = await this.service.listarQuadras(parse.data);

        res.json(usuarios);
       
    }

    async adicionarQuadra(req:Request, res:Response){
    
        const parse = QuadraBaseSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
        const resposta = await this.service.adicionarQuadra(parse.data);

        return res.status(201).json(resposta);

    }

    async editarQuadra(req:Request,res:Response){
        
        const parse = ListarQuadraSchema.safeParse({
            id_quadra:Number(req.params.id),
            ...req.body
        });

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const resposta = await this.service.editarQuadra(parse.data);

        return res.status(200).json(resposta);

    }

    async excluirQuadra(req:Request, res:Response){

        const id = Number(req.params.id);

        if(Number.isNaN(id)) return res.status(400).json({erro:"Id inválido"});

        const resposta = await this.service.excluirQuadra(id);

        return res.status(200).json(resposta);

    }

    async ativarQuadra(req:Request, res:Response){

        const id = Number(req.params.id);

        if(Number.isNaN(id)) return res.status(400).json({erro:"Id inválido"});

        const resposta = await this.service.ativarQuadra(id);

        return res.status(200).json(resposta);

    }

}