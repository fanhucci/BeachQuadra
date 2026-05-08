
import { EditarHorarioDTO } from "@app/shared";
import HorarioRepository from "../repositories/horarioRepository";


export default class HorarioService{

    private horario = new HorarioRepository();

    async listarHorario(){
        return await this.horario.listarHorario();
    }

    async editarHorario(horario:EditarHorarioDTO[]){
        return await this.horario.editarHorario(horario);
    }

    async listarHorariosDisponiveisParaReserva(data:Date, tipo:string){
        return await this.horario.retornarHorariosPermitidos(data, undefined, tipo);
 
    }

    async listarAgendaDeQuadraPorId(id:number, data:Date){
        return await this.horario.retornarHorariosPermitidos(data, id, undefined);
    }
}