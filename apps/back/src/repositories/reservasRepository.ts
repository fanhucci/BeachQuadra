import { TransactionSql } from "postgres";

export default class ReservaRepository{
    
    async criarReserva(tx:TransactionSql,id_agendamento:number,horarios:Date[],idsQuadras:number[]){
        return await tx`
            insert into reservas (id_agendamento, id_quadra, horario, valor)
            select 
                ${id_agendamento},
                q.id_quadra,
                lista.horario,
                q.valor
            from unnest(${horarios}) with ordinality as lista(horario, ord)
            join unnest(${idsQuadras}::int[]) with ordinality as ids(id, ord) on lista.ord = ids.ord
            join quadras q on q.id_quadra = ids.id
    `;
    }

    async cancelarReservas(tx:TransactionSql,id_agendamento:number){
        return await tx`
            update reservas
            set status = 'cancelado'
            where id_agendamento = ${id_agendamento}
        `;
    }
}