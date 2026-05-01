import { Request, Response } from "express";
import AgendamentoService from "../services/agendamentoService";
import { NovoAgendamentoSchema, AlterarAgendamentoSchema} from "@app/shared";
export default class AgendamentoController{
    private service = new AgendamentoService();

    async cadastrarNovoAgendamento(req:Request,res:Response){
        const parse = NovoAgendamentoSchema.safeParse({
            ...req.body,
            created_by:req.user?.id
        });

        if(!parse.success) return res.status(400).json({erro: parse.error.message}) ;
        
        const resposta = await this.service.criarNovoAgendamento(parse.data);

        res.status(201).json(resposta);
    }

    async alterarStatusAgendamento(req:Request,res:Response){
     
        const parse = AlterarAgendamentoSchema.safeParse(req.body);

        if(!parse.success) return res.status(400).json({erro: parse.error.message}) ;
        
        const resposta = await this.service.alterarStatusAgendamento(parse.data);

        res.status(200).json(resposta);
    }
}