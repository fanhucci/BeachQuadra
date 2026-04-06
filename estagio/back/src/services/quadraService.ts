import { EditarQuadraDTO, NovaQuadraDTO } from "@shared/schemas/quadraSchema";
import QuadraRepository from "../repositories/quadraRepository";


export default class QuadraService{
    private repo = new QuadraRepository();

    async listarQuadras(){
        return await this.repo.listarQuadras();
    }

    async adicionarQuadra(quadra:NovaQuadraDTO){
        return await this.repo.adicionarQuadra(quadra);
    }

    async editarQuadra(quadra:EditarQuadraDTO){
        return await this.repo.editarQuadra(quadra);
    }

    async excluirQuadra(id:number){
        return await this.repo.excluirQuadra(id);
    }
}