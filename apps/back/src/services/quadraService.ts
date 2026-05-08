
import AppError from "../infra/appError";
import QuadraRepository from "../repositories/quadraRepository";
import { AdicionarQuadraDTO, QuadraDTO, QuadraQueryDTO } from "@app/shared";


export default class QuadraService{
    private repo = new QuadraRepository();

    async listarQuadras(filtro:QuadraQueryDTO){
        return await this.repo.listarQuadras(filtro);
    }

    async adicionarQuadra(quadra:AdicionarQuadraDTO){
        const existe = await this.repo.quadraExistente(quadra.nome);

        if(existe) throw new AppError("Quadra já existe!",409);

        return await this.repo.adicionarQuadra(quadra);
    }

    async editarQuadra(quadra:QuadraDTO){

        const existe = await this.repo.quadraExistente(quadra.nome, quadra.id_quadra);

        if(existe) throw new AppError("Quadra já existe!",409);

        return await this.repo.editarQuadra(quadra);
    }

    async excluirQuadra(id:number){
        return await this.repo.excluirQuadra(id);
    }

    async ativarQuadra(id:number){
        return await this.repo.ativarQuadra(id);
    }
}