
import QuadraRepository from "../repositories/quadraRepository";
import { QuadraSearch, NovaQuadra, EditarQuadra } from "@app/shared";


export default class QuadraService{
    private repo = new QuadraRepository();

    async listarQuadras(filtro:QuadraSearch){
        return await this.repo.listarQuadras(filtro);
    }

    async adicionarQuadra(quadra:NovaQuadra){
        return await this.repo.adicionarQuadra(quadra);
    }

    async editarQuadra(quadra:EditarQuadra){
        return await this.repo.editarQuadra(quadra);
    }

    async ativarQuadra(id:number){
        return await this.repo.ativarQuadra(id);
    }

    async desativarQuadra(id:number){
        return await this.repo.desativarQuadra(id);
    }
}