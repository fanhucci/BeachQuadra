import { Request, Response } from "express";
import BloqueioService from "../services/bloqueioService";
import {NovoBloqueioSchema} from '@app/shared';

export default class BloqueioController{
    private bloqueio = new BloqueioService();

    async registrarBloqueio(req:Request, res:Response){
        
        const parse = NovoBloqueioSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        await this.bloqueio.criarNovoBloqueio(parse.data);
        
        res.send(201);
    }

    async deletarBloqueio(req:Request,res:Response){

        const id = Number(req.params.id);

        await this.bloqueio.deletarBloqueio(id);

        res.send(200);
    }
}