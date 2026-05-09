import {NovoBloqueioDTO} from "@app/shared";
import sql from "../infra/db";

export default class BloqueioRepository{
    async bloquearNovoDia(dados:NovoBloqueioDTO){
        return await sql`
            insert into dias_bloqueados
            (motivo,inicio_bloqueio,fim_bloqueio)
            values(${dados.motivo,dados.inicio_bloqueio,dados.fim_bloqueio})
            returninig id_bloqueio
        `;
    }

    async deletarBloqueio(id_bloqueio:number){
        return await sql`
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