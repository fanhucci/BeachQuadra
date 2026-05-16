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

    async novaCobranca(tx:TransactionSql, id_agendamento:number, id_pessoa:number, valor:number){
        return await tx`
            insert into cobrancas
            (id_agendamento, id_pessoa, valor, status)
            values (
                ${id_agendamento},
                ${id_pessoa},
                ${valor},
                'pendente'
            )
            returning *
        `;
    }

    async pagarCobrancaPorId(tx:TransactionSql,id:number){
        const [{id_agendamento}] =  await tx`
            update cobrancas
            set 
                status = 'concluido',
                data_pagamento = now()
            where id_cobranca = ${id}
            returning id_agendamento
        `;
        return id_agendamento;
    }

    async cancelarCobrancaPorId(tx:TransactionSql,id:number){
        const [{id_agendamento}] = await tx`
            update cobrancas
                set 
                    status = 'cancelado'
                where id_cobranca = ${id}
                returning id_agendamento
            `;
        return id_agendamento;
    }

    async estornarCobrancaPorId(tx:TransactionSql,id:number){
        const [{id_agendamento}] = await tx`
            update cobrancas
                set 
                    status = 'estornado'
                where id_cobranca = ${id}
                returning id_agendamento
            `;
        return id_agendamento;
    }

    async expirarCobrancaPorId(tx:TransactionSql,id:number){
        const [{id_agendamento}] = await tx`
            update cobrancas
                set 
                    status = 'expirado'
                where id_cobranca = ${id}
                returning id_agendamento
        `;
        return id_agendamento
    }
}