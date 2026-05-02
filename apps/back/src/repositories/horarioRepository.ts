import { EditarHorarioDTO } from '@app/shared';
import sql from "../infra/db";
import { TransactionSql } from 'postgres';

export default class HorarioRepository {
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
        return await sql`select * from horario_funcionamento order by id_horario`;
    }

    async horarioPermitido(tx:TransactionSql, horario:Date){
        const [{res}] = await tx`
            select 
            not exists(
                select 1 
                from dias_bloqueados db
                where ${horario} >= db.inicio_bloqueio 
                and ${horario} < db.fim_bloqueio
            )
            and 
            exists(
                select 1 
                from horario_funcionamento hf
                where
                    hf.ativo = true 
                    and hf.dia_semana = extract(dow from ${horario})
                    and ${horario}::time >= hf.horario_abertura
                    and (${horario}::time + interval '1 hour') <= hf.horario_fechamento
            )
            as permitido
        `;
        return res as boolean;
    }
}
