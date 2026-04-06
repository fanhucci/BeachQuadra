import { Request, Response } from 'express';
import { EditarQuadraSchema, NovaQuadraSchema } from '../../../shared/schemas/quadraSchema';
import QuadraService from '../services/quadraService';


export default class QuadraController{
    private service = new QuadraService();

    async listarQuadras(req:Request, res:Response){
        try{
            const usuarios = await this.service.listarQuadras();

            res.json(usuarios);
        }
        catch(err){
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async adicionarQuadra(req:Request, res:Response){
        try {
            const parse = NovaQuadraSchema.safeParse(req.body);

            if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
            const resposta = await this.service.adicionarQuadra(parse.data);

            return res.status(201).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async editarQuadra(req:Request,res:Response){
        try {

            const parse = EditarQuadraSchema.safeParse({
                id_quadra:Number(req.params.id),
                ...req.body
            });

            if(!parse.success) return res.status(400).json({erro: parse.error.message});

            const resposta = await this.service.editarQuadra(parse.data);

            return res.status(200).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno:${err}`});
        }
    }

    async excluirQuadra(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(Number.isNaN(id)) return res.status(400).json({erro:"Id inválido"});

            const resposta = await this.service.excluirQuadra(id);

            return res.status(200).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno:${err}`});
        }
    }

}