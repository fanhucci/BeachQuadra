import { TransactionSql } from "postgres";
import sql from "../infra/db";

export default class ReservaRepository{
    
    async criarReserva(tx:TransactionSql,dados){
        return await tx`
            insert into reservas
            (id_agendamento, id_quadra, valor)
            values (${dados.id_agendamento,dados.id_quadra,dados.valor})
            returning id_reserva
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