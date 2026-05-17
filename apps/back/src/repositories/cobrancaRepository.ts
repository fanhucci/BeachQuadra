import { TransactionSql } from "postgres";
import sql from "../infra/db";
import { CobrancaSearch } from '@app/shared';

export default class CobrancaRepository{

    async listarCobrancas(filtros:CobrancaSearch){
        const {nome, pagamento, data_inicio, data_fim, page = 1, limit = 10} = filtros;

        const offset = (Number(page) -1) * Number(limit); 

        return await sql`
            with query_filtrada as (
                select 
                    c.id_cobranca,
                    c.id_agendamento,
                    c.id_pessoa,
                    c.valor,
                    c.status,
                    c.data_pagamento,
                    p.nome
                from cobrancas c
                join pessoas p on p.id_pessoa = c.id_pessoa
                where 1=1
                    and (${nome ?? null}::text is null or p.nome ilike ${'%'+nome+'%'})
                    and (${pagamento ?? null}::text is null or c.status = ${pagamento})
                    and (${data_inicio ?? null}::text is null or c.data_pagamento >= ${data_inicio}::date)
                    and (${data_fim ?? null}::text is null or c.data_pagamento <= ${data_fim}::date + interval '1 day' - interval '1 second')
            ),
            total_registros as (
                select count(*) as total from query_filtrada
            )
            select 
                q.*,
                t.total::int as total_geral
            from query_filtrada q
            cross join total_registros t
            order by q.data_pagamento desc nulls last
            limit ${Number(limit)}
            offset ${offset};
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