import { TransactionSql } from "postgres";
import sql from "../infra/db";
import {NovoAgendamentoDTO} from '@app/shared';

export default class AgendamentoRepository{

    async calcularTotal(tx:TransactionSql,idsQuadras:number[]){
        const [{total}] = await tx`
            select coalesce(sum(valor), 0) as total
            from quadras 
            where id_quadra in ${tx(idsQuadras)}
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

    async alterarStatusAgendamento(id_agendamento:number,status:string){
        return await sql`
            update agendamentos
            set status = ${status}
            where id_agendamento = ${id_agendamento}
        `;
    }
}