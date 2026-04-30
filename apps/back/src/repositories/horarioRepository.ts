import { EditarHorarioDTO } from '@app/shared';
import sql from "../infra/db";

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
}
