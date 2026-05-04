import { TransactionSql } from "postgres";
import sql from "../infra/db";
import {NovoAgendamentoDTO} from '@app/shared';

export default class AgendamentoRepository{

    async listarAgendamentos(){
        return await sql`
            select 
                a.*,
                p.nome
            from agendamentos a
            join pessoas p
                on p.id_pessoa = a.id_pessoa
            order by created_at
        `;
    }

    async buscarAgendamentoPorId(id:number){
        const [resultado] = await sql`
            select 
                a.id_agendamento,
                (
                    select json_build_object(
                        'id_pessoa', p.id_pessoa,
                        'nome', p.nome
                    )
                    from pessoas p
                    where p.id_pessoa = a.id_pessoa
                ) as cliente,
                a.status,
                a.valor_total,
                (
                    select json_build_object(
                        'id_pessoa', p.id_pessoa,
                        'nome', p.nome,
                        'cargo', c.id_cargo
                    )
                    from pessoas p
                    join cargos c 
                    on c.id_cargo = p.id_cargo
                    where p.id_pessoa = a.created_by
                ) as criado_por,
                (
                    select coalesce(
                        json_agg(
                            json_build_object(
                                'id_reserva', r.id_reserva,
                                'id_quadra', r.id_quadra,
                                'valor', r.valor,
                                'status', r.status,
                                'horario', r.horario
                            )
                        ), 
                        '[]'::json
                    )
                    from reservas r
                    where r.id_agendamento = a.id_agendamento
                ) as reservas 
            from agendamentos a
            where a.id_agendamento = ${id};
        `
        return resultado;
    }

    async calcularTotal(idsQuadras:number[]){
        const [{ total }] = await sql`
            select coalesce(sum(q.valor), 0) as total
            from unnest(${idsQuadras}::int[]) as lista(id)
            join quadras q on q.id_quadra = lista.id
        `;
        return Number(total);
    }

    async novoAgendamento(tx:TransactionSql,dados:NovoAgendamentoDTO,total:number){
        const [{id_agendamento}] = await tx`
            insert into agendamentos
            (id_pessoa, valor_total, created_by)
            values(${dados.id_pessoa}, ${total}, ${dados.created_by})
            returning id_agendamento
        `;
        return id_agendamento;
    }

    async alterarStatusAgendamento(tx:TransactionSql,id_agendamento:number,status:string){
        return await tx`
            update agendamentos
            set status = ${status}
            where id_agendamento = ${id_agendamento}
        `;
    }
}