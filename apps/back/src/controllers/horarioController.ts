import { listaEditarHorarioSchema } from '@app/shared';
import { Request, Response } from 'express';
import HorarioService from '../services/horarioService';

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
        const tipo = (req.query.tipo as string) || 'individual';
        const horarios = await this.service.listarHorariosDisponiveisParaReserva(tipo);

        return res.status(200).json(horarios);
    }
}