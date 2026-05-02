
import { EditarHorarioDTO } from "@app/shared";
import HorarioRepository from "../repositories/horarioRepository";
import { gerarGradeDeHorarios } from "../infra/gerarHorarios";
import QuadraRepository from "../repositories/quadraRepository";

export default class HorarioService{

    private horario = new HorarioRepository();
    private quadra = new QuadraRepository();
    async listarHorario(){
        return await this.horario.listarHorario();
    }

    async editarHorario(horario:EditarHorarioDTO[]){
        return await this.horario.editarHorario(horario);
    }

    async listarHorariosDisponiveisParaReserva(){

        const periodo = gerarGradeDeHorarios(14);

        const horarios = await this.horario.retornarHorariosPermitidos(periodo);

        const arrayHorarios = horarios.map(r=>r.horario)
        const arrayPermitido = horarios.map(p=>p.permitido)
 
        const horariosDisponiveis = await this.quadra.listarQuadrasDisponiveis(arrayHorarios, arrayPermitido);

        return horariosDisponiveis;
       
    }
}