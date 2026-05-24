
import { QuadraSearch, NovaQuadra, EditarQuadra } from "@app/shared";
import sql from "../infra/db";

export default class QuadraRepository {

    async listarQuadras(filtro: QuadraSearch) {
        const { search, tipo, status, ativo, page = 1, limit = 10 } = filtro;

        const offset = (Number(page) - 1) * Number(limit);

        const searchTexto = search ?? null;
        const searchTipo = tipo ?? null;
        const searchStatus = status !== undefined ? status : null;
        const searchAtivo = ativo !== undefined ? ativo : null;

        return await sql`
            with query_filtrada as (
                select * 
                from quadras 
                where 1=1
                    and (${searchTexto}::text is null or nome ilike '%' || ${searchTexto}::text || '%')
                    and (${searchTipo}::text is null or tipo = ${searchTipo}::"QuadraTypesEnum")
                    and (${searchStatus}::boolean is null or status = ${searchStatus}::boolean)
                    and (${searchAtivo}::boolean is null or ativo = ${searchAtivo}::boolean)
            ),
            total_registros as (
                select count(*) as total from query_filtrada
            )
            select 
                q.*,
                t.total::int as total_geral
            from query_filtrada q
            cross join total_registros t
            order by q.id_quadra desc
            limit ${Number(limit)}
            offset ${offset};
        `;
    }

    async adicionarQuadra(quadra:NovaQuadra){
        return await sql`
            insert into quadras 
            (nome,tipo,status,valor) 
            values (${quadra.nome},${quadra.tipo},${quadra.status}, ${quadra.valor}) 
            returning *
        `;
    }

    async editarQuadra(quadra:EditarQuadra){
        const {id_quadra, ...dados} = quadra;

        const dadosParaAtualizar = Object.fromEntries(
            Object.entries(dados).filter(([_, v]) => v !== undefined)
        );

        if(Object.keys(dadosParaAtualizar).length === 0 ) return;

        return await sql`
            update quadras 
            set ${sql(dadosParaAtualizar)}
            where id_quadra = ${id_quadra} 
            returning *
        `;
    }

    async ativarQuadra(id:number){
        return await sql`
            update quadras 
            set ativo = true 
            where id_quadra = ${id}
        `;
    } 

    async desativarQuadra(id:number){
        return await sql`
            update quadras 
            set ativo = false 
            where id_quadra = ${id}
        `;
    } 

}