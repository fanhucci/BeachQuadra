import { PessoaQuerySchema } from "@app/shared";
import { Request, Response } from 'express';
import UsuarioService from "../services/usuarioService";

export default class UsuarioController{
    private service = new UsuarioService();

    async listarUsuarios(req:Request, res:Response){

        const parse = PessoaQuerySchema.safeParse(req.query);
            
        if(!parse.success) return res.status(400).json({erro: parse.error.message})
    
        const usuarios = await this.service.listarUsuarios(parse.data);
    
        res.json(usuarios);
    
    }

    async listarUsuarioPerfil(req:Request,res:Response){

        const id = Number(req.user.id);
        console.log(id)

        if(isNaN(id)) return res.status(400).json({erro: "Id inválido"})

        const usuario = await this.service.listarUsuarioPorId(id);

        res.json(usuario);
    }

    async listarUsuarioPorId(req:Request, res:Response){
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({erro: "Id inválido"})

        const usuario = await this.service.listarUsuarioPorId(id);

        res.json(usuario);
    }

}