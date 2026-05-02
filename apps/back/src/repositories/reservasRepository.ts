import { TransactionSql } from "postgres";
import {NovaReservaDTO} from '@app/shared';

export default class ReservaRepository{
    
    async criarReserva(tx:TransactionSql,id_agendamento:number,dados:NovaReservaDTO){
        return await tx`
            insert into reservas
            (id_agendamento, id_quadra, valor)
            select
            ${id_agendamento},
            q.id_quadra,
            q.valor
            from quadras q
            where q.id_quadra = ${dados.id_quadra}
        `
    }

    async cancelarReservas(tx:TransactionSql,id_agendamento:number){
        return await tx`
            update reservas
            set status = 'cancelado'
            where id_agendamento = ${id_agendamento}
        `;
    }
}