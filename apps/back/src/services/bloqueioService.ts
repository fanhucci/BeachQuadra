import {NovoBloqueioDTO} from '@app/shared';
import BloqueioRepository from "../repositories/bloqueioRepository";

export default class BloqueioService {
    private bloqueio = new BloqueioRepository();

    async criarNovoBloqueio(dados:NovoBloqueioDTO){

        return await this.bloqueio.bloquearNovoDia(dados);

    }

    async deletarBloqueio(id:number){

        return await this.bloqueio.deletarBloqueio(id);
    }
}