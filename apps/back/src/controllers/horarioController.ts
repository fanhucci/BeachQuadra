import { listaEditarHorarioSchema, AgendaHorarioSchema } from '@app/shared';
import { Request, Response } from 'express';
import HorarioService from '../services/horarioService';
import { date } from 'zod';

export default class HorarioController{
    private service = new HorarioService();

    async listarHorario(req:Request, res:Response){
        try{
            const horario = await this.service.listarHorario();
            res.status(200).send(horario)
        }
        catch(err){
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async editarHorario(req:Request, res:Response){

        try{
            const parse = listaEditarHorarioSchema.safeParse(req.body);

            if(!parse.success) return res.status(400).json({erro: parse.error.message});

            const resposta = await this.service.editarHorario(parse.data);

            return res.status(200).json(resposta);
        }
        catch(err){
            console.error(err);
            return res.status(500).json({erro:`Erro interno`});
        }
    }

    async listarHorariosDisponiveis(req:Request, res:Response){
        
        const queryData = req.query.data as string;
        const data = (queryData && !isNaN(Date.parse(queryData))) 
            ? new Date(queryData) 
            : new Date();

        const tipo = (req.query.tipo as string) || 'individual';

        const horarios = await this.service.listarHorariosDisponiveisParaReserva(data,tipo);

        return res.status(200).json(horarios);
    }

    async listarAgendaDeQuadraPorId(req:Request, res:Response){
        const idQuadra = Number(req.params.id);
      
        if(isNaN(idQuadra)) return res.status(400).json({erro: 'ID inválido'});

        const queryData = req.query.data as string;
        const data = (queryData && !isNaN(Date.parse(queryData))) 
            ? new Date(queryData) 
            : new Date();


        const horarios = await this.service.listarAgendaDeQuadraPorId(idQuadra,data);

        return res.status(200).json(horarios);
    }
}