import { TransactionSql } from "postgres";
import sql from "../infra/db";
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

    async alterarStatusReserva(id_reserva:number,status:string){
        return await sql`
            update reservas
            set status = ${status}
            where id_reserva = ${id_reserva}
        `;
    }
}