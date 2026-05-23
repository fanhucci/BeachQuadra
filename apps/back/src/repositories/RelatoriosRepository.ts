import sql from "../infra/db";
import {OcupacaoSearch} from "@app/shared";

export default class RelatoriosRepository{

    async listarOcupacao(filtro: OcupacaoSearch) {
        const { search, tipo, data_inicio, data_fim, page = 1, limit = 10 } = filtro;

        const offset = (Number(page) - 1) * Number(limit);

        const searchTexto = search || null;
        const searchTipo = tipo || null;
        const dataInicio = data_inicio || null;
        const dataFim = data_fim || null;

        return await sql`
            with query_filtrada as (
                select 
                    q.id_quadra,
                    q.nome as nome_quadra,
                    q.tipo,
                    -- Conta as reservas filtrando pelo status na agregação
                    count(r.id_reserva) filter (where r.status != 'cancelado')::int as total_reservas,
                    count(r.id_reserva) filter (where r.status = 'cancelado')::int as total_cancelamentos
                from quadras q
                left join reservas r on q.id_quadra = r.id_quadra
                    -- Filtro de período direto no JOIN para não sumir com quadras sem reservas
                    and (${dataInicio}::date is null or r.data_reserva >= ${dataInicio}::date)
                    and (${dataFim}::date is null or r.data_reserva <= ${dataFim}::date)
                where 1=1
                    -- Filtro por Nome da Quadra
                    and (${searchTexto}::text is null or q.nome ilike '%' || ${searchTexto}::text || '%')
                    
                    -- Filtro por Tipo (Enum) usando o seu Cast customizado
                    and (${searchTipo}::text is null or q.tipo = ${searchTipo}::"QuadraTypesEnum")
                group by 
                    q.id_quadra, 
                    q.nome, 
                    q.tipo
            ),
            total_registros as (
                select count(*) as total from query_filtrada
            )
            select 
                q.*,
                t.total::int as total_geral
            from query_filtrada q
            cross join total_registros t
            order by q.total_reservas desc
            limit ${Number(limit)}
            offset ${offset};
        `;
    }
}