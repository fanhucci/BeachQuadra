import { UsuarioHistoricoSearchSchema,UsuarioSearchSchema, NovoUsuarioSchema, NovoUsuarioProprioSchema, EditarUsuarioSchema  } from "@app/shared";
import { Request, Response } from 'express';
import UsuarioService from "../services/usuarioService";

export default class UsuarioController{
    private service = new UsuarioService();

    async listarUsuarios(req:Request, res:Response){

        const parse = UsuarioSearchSchema.safeParse(req.query);
            
        if(!parse.success) return res.status(400).json({erro: parse.error.message})
    
        const usuarios = await this.service.listarUsuarios(parse.data);
    
        res.json(usuarios);
    
    }

    async listarUsuarioPerfil(req:Request,res:Response){
        
        if(!req.user) return res.sendStatus(401);

        const id = Number(req.user.id);

        if(isNaN(id)) return res.status(400).json({erro: "Id inválido"})
        
        const usuario = await this.service.listarUsuarioPorId(req.user,id);

        res.json(usuario);
    }

    async listarHistorico(req:Request, res:Response){

        if(!req.user) return res.sendStatus(401);

        const id = Number(req.params.id);

        const parse = UsuarioHistoricoSearchSchema.safeParse(req.query);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const historico = await this.service.listarHistoricoPerfil(req.user,id,parse.data);

        res.status(200).json(historico);
    }

    async listarUsuarioPorId(req:Request, res:Response){

        if(!req.user) return res.sendStatus(401);

        const id_busca = Number(req.params.id);
        
        if(isNaN(id_busca)) return res.status(400).json({erro: "Id inválido"})

        const usuario = await this.service.listarUsuarioPorId(req.user,id_busca);

        res.json(usuario);
    }

    async buscarClientes(req:Request, res:Response){
        
        const {search} = req.query;

        const busca = String( search || '');

        if (!busca || busca.length < 3) {
            return res.json([]); 
        }

        const clientes = await this.service.buscarClientes(busca);

        res.json(clientes);
    }

    async adicionarUsuario(req:Request, res:Response){
        const parse = NovoUsuarioSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const resposta = await this.service.adicionarUsuario(parse.data);

        return res.status(201).json(resposta);
       
    }

    async adicionarUsuarioProprio(req:Request, res:Response){
        const parse = NovoUsuarioProprioSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const resposta = await this.service.adicionarUsuarioProprio(parse.data);

        return res.status(201).json(resposta);

    }

    async editarUsuario(req:Request, res:Response){

        if(!req.user) return res.sendStatus(401);

        const parse = EditarUsuarioSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message});

        const resposta = await this.service.editarUsuario(req.user,parse.data);

        return res.status(201).json(resposta);
       
    }

    async ativarUsuario(req:Request, res:Response){
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({erro: "Id inválido"})

        const resposta = await this.service.ativarUsuario(id);

        return res.status(200).json(resposta);
       
    }

    async desativarUsuario(req:Request, res:Response){
        const id = Number(req.params.id);

        if(isNaN(id)) return res.status(400).json({erro: "Id inválido"})

        const resposta = await this.service.desativarUsuario(id);

        return res.status(200).json(resposta);
       
    }




}