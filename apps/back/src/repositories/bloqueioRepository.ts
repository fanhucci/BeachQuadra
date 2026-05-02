import { TransactionSql } from "postgres";
import {NovoBloqueioDTO} from "@app/shared";
import sql from "../infra/db";

export default class BloqueioRepository{
    async bloquearNovoDia(tx:TransactionSql,dados:NovoBloqueioDTO){
        return await tx`
            insert into dias_bloqueados
            (motivo,inicio_bloqueio,fim_bloqueio)
            values(${dados.motivo,dados.inicio,dados.fim})
            returninig id_bloqueio
        `;
    }

    async deletarBloqueio(tx:TransactionSql,id_bloqueio:number){
        return await tx`
            delete from dias_bloqueados
            where id_bloqueio = ${id_bloqueio}
        `
    }

    async listarDiasBloqueados(){
        return await sql`
            select inicio,fim 
            from dias_bloqueados
            where inicio> now();
        `;
    }
}