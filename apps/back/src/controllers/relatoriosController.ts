import { Request, Response } from "express";
import {OcupacaoSearchSchema} from "@app/shared";
import RelatoriosService from "../services/relatoriosService";

export default class RelatoriosController{
    private service = new RelatoriosService();

    async listarOcupacao(req:Request, res:Response){

        const parse = OcupacaoSearchSchema.safeParse(req.query);
        
        if(!parse.success) return res.status(400).json({erro: parse.error.message})
        
        const ocupacao = await this.service.listarOcupacao(parse.data);
        
        res.json(ocupacao);
    }
}