import { Request, Response } from 'express';
import { EditarUsuarioSchema, NovoUsuarioSchema } from "../../../shared/schemas/usuarioSchema";
import UsuarioService from '../services/usuarioService';
 

export default class UsuarioController{
    private service = new UsuarioService();

    async listarUsuarios(req:Request, res:Response){
        try{
            const usuarios = await this.service.listarUsuarios();

            res.json(usuarios);
        }
        catch(err){
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async adicionarUsuario(req:Request, res:Response){
        try {
            const parse = NovoUsuarioSchema.safeParse(req.body);

            if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
            const resposta = await this.service.adicionarUsuario(parse.data);

            return res.status(201).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async editarUsuario(req:Request,res:Response){
        try {

            const parse = EditarUsuarioSchema.safeParse({
                id:Number(req.params.id),
                ...req.body
            });

            if(!parse.success) return res.status(400).json({erro: parse.error.message});

            const resposta = await this.service.editarUsuario(parse.data);

            return res.status(200).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno:${err}`});
        }
    }

    async excluirUsuario(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(Number.isNaN(id)) return res.status(400).json({erro:"Id inválido"});

            const resposta = await this.service.excluirUsuario(id);

            return res.status(200).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno:${err}`});
        }
    }

}