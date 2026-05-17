import { Request, Response } from "express";
import CobrancaService from "../services/cobrancaService";
import {CobrancaSearchSchema} from '@app/shared';

export default class CobrancaController {
    private service = new CobrancaService();

    async listarCobrancas(req:Request, res:Response){

        const parse = CobrancaSearchSchema.safeParse(req.query)

        if(!parse.success) return res.status(400).json({erro: parse.error.message})

        const resposta = await this.service.listarCobrancas(parse.data);
        
        res.status(200).json(resposta);
    }

    
    async listarCobrancasPorId(req:Request, res:Response){
        const {id} = req.params;
        const id_numero = Number(id);

        if(isNaN(id_numero)) throw new Error(`ID inválido.`);
        
        const resposta = await this.service.listarCobrancasPorId(id_numero);
        
        res.status(200).json(resposta);
    }

    async pagarCobranca(req:Request, res:Response){
        const {id} = req.params;
        const id_numero = Number(id);

        if(isNaN(id_numero)) throw new Error(`ID inválido.`);

        await this.service.pagarCobranca(id_numero);

        res.sendStatus(200);
    }

    async cancelarCobranca(req:Request, res:Response){
        const {id} = req.params;
        const id_numero = Number(id);

        if(isNaN(id_numero)) throw new Error(`ID inválido.`);

        await this.service.cancelarCobranca(id_numero);

        res.sendStatus(200);
    }

    async estornarCobranca(req:Request, res:Response){
        const {id} = req.params;
        const id_numero = Number(id);

        if(isNaN(id_numero)) throw new Error(`ID inválido.`);

        await this.service.estornarCobranca(id_numero);

        res.sendStatus(200);
    }

    async expirarCobranca(req:Request, res:Response){
        const {id} = req.params;
        const id_numero = Number(id);

        if(isNaN(id_numero)) throw new Error(`ID inválido.`);

        await this.service.expirarCobranca(id_numero);

        res.sendStatus(200);
    }
}