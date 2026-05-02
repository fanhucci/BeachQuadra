import { EditarHorarioDTO } from '@app/shared';
import sql from "../infra/db";
import { TransactionSql } from 'postgres';

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

    //precisa ser alterada
    async listarHorario() {
        return await sql`select * from horario_funcionamento order by id_horario`;
    }

    async retornarHorariosPermitidos( horarios:Date[]){
        return await sql`
            with lista_horarios as (
                select unnest(${horarios}::timestamptz[]) as horario
            )
            
        `;
    }
}


// select 
//                 h.horario, 
//                 (
//                     not exists(
//                         select 1 
//                         from dias_bloqueados db
//                         where h.horario >= db.inicio_bloqueio 
//                         and h.horario < db.fim_bloqueio
//                     )
//                     and 
//                     exists(
//                         select 1 
//                         from horario_funcionamento hf
//                         where
//                             hf.ativo = true 
//                             and hf.dia_semana = extract(dow from h.horario)
//                             and h.horario::time >= hf.horario_abertura::time
//                             and (h.horario::time + interval '1 hour') <= hf.horario_fechamento::time
//                     )
//                 )as permitido
//             from lista_horarios h 
