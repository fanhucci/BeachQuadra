import { EditarHorarioDTO } from "@shared/schemas/horarioSchema";
import HorarioRepository from "../repositories/horarioRepository";

export default class HorarioService{

    private repo = new HorarioRepository();
    async listarHorario(){
        return await this.repo.listarHorario();
    }

    async editarHorario(horario:EditarHorarioDTO[]){
        return await this.repo.editarHorario(horario);
    }
}