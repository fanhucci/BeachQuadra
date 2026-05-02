import { TransactionSql } from "postgres";
import sql from "../infra/db";
import {NovoAgendamentoDTO} from '@app/shared';

export default class AgendamentoRepository{

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
            values(${dados.id_pessoa, total, dados.created_by})
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