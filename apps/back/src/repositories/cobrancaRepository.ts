import { TransactionSql } from "postgres";
import sql from "../infra/db";

export default class CobrancaRepository{

    async listarCobrancas(){
        return await sql`
            select * 
            from cobrancas
        `;
    }

    async listarCobrancasPorId(id:number){
        return await sql`
            select * 
            from cobrancas
            where id_cobranca = ${id}
        `;
    }

    async pagarCobrancaPorId(tx:TransactionSql,id:number){
        const [{id_agendamento}] =  await tx`
            update cobrancas
            set 
                status = 'confirmado',
                data_pagamento = now()
            where id_cobranca = ${id}
            returning id_agendamento
        `;
        return id_agendamento;
    }
}