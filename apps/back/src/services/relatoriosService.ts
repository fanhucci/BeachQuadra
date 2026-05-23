import {OcupacaoSearch} from "@app/shared";
import RelatoriosRepository from "../repositories/RelatoriosRepository";

export default class RelatoriosService{
    private repo = new RelatoriosRepository();

    async listarOcupacao(filtro:OcupacaoSearch){
        return await this.repo.listarOcupacao(filtro);
    }
}