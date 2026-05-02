import sql from "../infra/db";
import {NovoBloqueioDTO} from '@app/shared';
import BloqueioRepository from "../repositories/bloqueioRepository";

export default class BloqueioService {
    private bloqueio = new BloqueioRepository();

    async criarNovoBloqueio(dados:NovoBloqueioDTO[]){
        await sql.begin(async(tx)=>{

            for(const dia of dados){
                await this.bloqueio.bloquearNovoDia(tx,dia);
            }
            return true;
        })

    }

    async deletarBloqueio(ids:number[]){
        await sql.begin(async(tx)=>{

            for(const id of ids){
                await this.bloqueio.deletarBloqueio(tx,id);
            }
            return true;
        })
    }
}