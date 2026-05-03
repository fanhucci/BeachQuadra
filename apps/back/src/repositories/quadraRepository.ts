
import { AdicionarQuadraDTO, QuadraDTO, QuadraQueryDTO } from "@app/shared";
import sql from "../infra/db";
import { TransactionSql } from "postgres";

export default class QuadraRepository {

    async adicionarQuadra(quadra:AdicionarQuadraDTO){
        return await sql`insert into quadras (nome,tipo,status,valor) values (${quadra.nome},${quadra.tipo},${quadra.status}, ${quadra.valor}) returning *`;
    }

    async excluirQuadra(id:number){
        return await sql`update quadras set ativo = false where id_quadra = ${id}`;
    } 

    async ativarQuadra(id:number){
        return await sql`update quadras set ativo = true where id_quadra = ${id}`;
    } 

    async editarQuadra(quadra:QuadraDTO){
        return await sql`update quadras set nome = ${quadra.nome}, tipo = ${quadra.tipo}, status = ${quadra.status}, valor = ${quadra.valor} where id_quadra = ${quadra.id_quadra} returning *`;
    }

    async listarQuadras(filtro:QuadraQueryDTO){
        return await sql`select * from quadras 
            where 1=1

            ${filtro.search
                ?sql`and nome like ${'%'+filtro.search+'%'}`
                :sql``
            }

            ${filtro.tipo
            ? sql`and tipo = ${filtro.tipo}`
            : sql``}
                
            ${filtro.status !== undefined
            ? sql`and status = ${filtro.status}`
            : sql``}

            ${filtro.ativo !== undefined
            ? sql`and ativo = ${filtro.ativo}`
            : sql``}

            order by id_quadra desc`;
    }

    async quadraExistente(nome:string, id?:number){
        const result = await sql`
            select exists(
            select 1
            from quadras
            where nome = ${nome}
            ${id? sql`and id_quadra != ${id}` : sql``}
            )
        `;

        return result[0].exists;
    }

async listarQuadrasDisponiveis(horarios: Date[], permitido: boolean[]) {
    return await sql`
        with lista_horarios as (
            select 
                t.horario::timestamptz as horario, 
                t.permitido
            from unnest(
                ${sql.array(horarios)}::timestamptz[],
                ${sql.array(permitido)}::boolean[]
            ) as t(horario, permitido)
        )

        select 
            h.horario,
            h.permitido,
            case
                when not h.permitido then '[]'::json
                else (
                    select coalesce(json_agg(q.id_quadra), '[]')
                    from quadras q
                    where not exists (
                        select 1
                        from reservas r
                        where r.id_quadra = q.id_quadra
                        and r.status = 'ativo'
        
                        and r.horario AT TIME ZONE 'UTC' = h.horario AT TIME ZONE 'UTC'
                    )
                )
            end as quadras
        from lista_horarios h
    `;
}

}
