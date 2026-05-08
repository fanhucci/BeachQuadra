import { EditarHorarioDTO } from '@app/shared';
import sql from "../infra/db";

export default class HorarioRepository {
    //precisa ser alterada 
    async editarHorario(horario: EditarHorarioDTO[]) {

        return await sql.begin(async (transaction) => {
            const resultados = [];

            for (const dia of horario) {
                
                const [res] = await transaction`
                    update horario_funcionamento 
                    set 
                        horario_abertura = ${dia.horario_abertura}, 
                        horario_fechamento = ${dia.horario_fechamento}, 
                        ativo = ${dia.ativo} 
                    where id_horario = ${dia.id_horario} 
                    returning *
                `;
                
                resultados.push(res);
            }

            return resultados;
        });
    }

    async listarHorario() {
        const [data] = await sql`
            select
                (select json_agg(h) from horario_funcionamento h) as horario,
                coalesce((select json_agg(d) from dias_bloqueados d),'[]'::json) as bloqueios  
        `;
        return data;
    }

    async validarHorarios(horarios: Date[]) {
        return await sql`
            select 
                unnest(${sql.array(horarios)}::timestamptz[]) as horario,
                exists (
                    select 1 FROM horario_funcionamento hf
                    where hf.ativo = true
                    and hf.dia_semana = extract(dow from h.horario)
                    and (h.horario)::time >= hf.horario_abertura
                    and (h.horario)::time + interval '1 hour' <= hf.horario_fechamento
                ) as permitido
            from (select unnest(${sql.array(horarios)}::timestamptz[]) as horario) as h
        `;
        
    }

    async retornarHorariosPermitidos(data:Date, id_quadra?:number, tipo?:string) {

        const dataInicio = new Date(data);
        const dia = dataInicio.getUTCDay();
        const diff = dataInicio.getUTCDate() - dia + (dia === 0 ? -6 : 1);
        
        dataInicio.setUTCDate(diff);
        dataInicio.setUTCHours(0, 0, 0, 0);

        return await sql`
            with lista_horarios as (
                select generate_series(
                    ${dataInicio}::timestamptz,
                    ${dataInicio}::timestamptz + interval '6 days 23 hours',
                    interval '1 hour'
                )as horario
            )
            select
                h.horario,
                (
                    not exists(
                        select 1 from dias_bloqueados db
                        where h.horario >= db.inicio_bloqueio 
                        and h.horario < db.fim_bloqueio
                    )
                    and exists(
                        select 1 from horario_funcionamento hf
                        where hf.ativo = true
                        and hf.dia_semana = extract(dow from h.horario)
                        and h.horario::time >= hf.horario_abertura::time
                        and h.horario::time + interval '1 hour' <= hf.horario_fechamento::time
                    )
                    and h.horario > now() + interval '1 hour'
                )as permitido,
                (
                    select 
                        r.id_agendamento 
                    from reservas r 
                    where r.id_quadra = ${id_quadra ?? null}::int
                    and r.horario = h.horario
                    and r.status != 'cancelado'
                    and ${id_quadra ?? null}::int is not null
                    limit 1
                    
                )as id_agendamento,
                (
                    select 
                        coalesce(json_agg(q.id_quadra),'[]'::json)
                    from quadras q
                    where q.ativo = true
                    and(${tipo ?? null}::text is null or q.tipo = ${tipo ?? null}::text)
                    and (${id_quadra ?? null}::int is null or q.id_quadra = ${id_quadra ?? null}::int)
                    and not exists(
                        select 
                            1 
                        from reservas r
                        where r.id_quadra = q.id_quadra
                        and r.horario = h.horario
                        and r.status != 'cancelado'
                    )
                )as disponivel

            from lista_horarios h
            where extract(hour from h.horario) between 7 and 23
            order by h.horario;
        `;
    }

}

