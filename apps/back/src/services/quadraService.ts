
import AppError from "../infra/appError";
import QuadraRepository from "../repositories/quadraRepository";
import { QuadraSearch, NovaQuadra, EditarQuadra } from "@app/shared";


export default class QuadraService{
    private repo = new QuadraRepository();

    async listarQuadras(filtro:QuadraSearch){
        return await this.repo.listarQuadras(filtro);
    }

    async adicionarQuadra(quadra:NovaQuadra){
        const existe = await this.repo.quadraExistente(quadra.nome);

        if(existe) throw new AppError("Quadra já existe!",409);

        return await this.repo.adicionarQuadra(quadra);
    }

    async editarQuadra(quadra:EditarQuadra){

        const existe = await this.repo.quadraExistente(quadra.nome, quadra.id_quadra);

        if(existe) throw new AppError("Quadra já existe!",409);

        return await this.repo.editarQuadra(quadra);
    }

    async ativarQuadra(id:number){
        return await this.repo.ativarQuadra(id);
    }

    async desativarQuadra(id:number){
        return await this.repo.desativarQuadra(id);
    }
}