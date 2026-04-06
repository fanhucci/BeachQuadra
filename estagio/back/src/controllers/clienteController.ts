import { Request, Response } from 'express';
import { EditarClienteSchema, NovoClienteSchema  } from "../../../shared/schemas/clienteSchema";
import ClienteService from '../services/clienteService';


export default class ClienteController{
    private service = new ClienteService();

    async listarClientes(req:Request, res:Response){
        try{
            const clientes = await this.service.listarClientes();

            res.json(clientes);
        }
        catch(err){
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async adicionarCliente(req:Request, res:Response){
        try {
            const parse = NovoClienteSchema.safeParse(req.body);

            if(!parse.success) return res.status(400).json({erro: parse.error.message})
            
            const resposta = await this.service.adicionarCliente(parse.data);

            return res.status(201).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async editarCliente(req:Request,res:Response){
        try {

            const parse = EditarClienteSchema.safeParse({
                id:Number(req.params.id),
                ...req.body
            });

            if(!parse.success) return res.status(400).json({erro: parse.error.message});

            const resposta = await this.service.editarCliente(parse.data);

            return res.status(200).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno:${err}`});
        }
    }

    async excluirCliente(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(Number.isNaN(id)) return res.status(400).json({erro:"Id inválido"});

            const resposta = await this.service.excluirCliente(id);

            return res.status(200).json(resposta);

        } catch (err) {
            console.error(err);
            return res.status(500).json({erro:`Erro interno:${err}`});
        }
    }

}