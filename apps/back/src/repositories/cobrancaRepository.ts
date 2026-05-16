import { TransactionSql } from "postgres";
import sql from "../infra/db";

export default class CobrancaRepository{

    async listarCobrancas(){
        return await sql`
            select 
                c.*, 
                p.nome 
            from cobrancas c
            join pessoas p
            on p.id_pessoa = c.id_pessoa
          
        `;
    }

    async listarCobrancasPorId(id:number){
        return await sql`
            select 
                c.*, 
                p.nome 
            from cobrancas c
            join pessoas p
            on p.id_pessoa = c.id_pessoa
            where c.id_cobranca = ${id}
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