import { EditarQuadraDTO, NovaQuadraDTO } from "@shared/schemas/quadraSchema";
import sql from "../public/db";

export default class QuadraRepository {

    async adicionarQuadra(quadra:NovaQuadraDTO){
        return await sql`insert into quadras (nome,tipo,status,valor) values (${quadra.nome},${quadra.tipo},${quadra.status}, ${quadra.valor}) returning *`;
    }

    async excluirQuadra(id:number){
        return await sql`delete from quadras where id_quadra = ${id}`;
    } 

    async editarQuadra(quadra:EditarQuadraDTO){
        return await sql`update quadras set nome = ${quadra.nome}, tipo = ${quadra.tipo}, status = ${quadra.status}, valor = ${quadra.valor} where id_quadra = ${quadra.id_quadra} returning *`;
    }

    async listarQuadras(){
        return await sql`select * from quadras order by id_quadra`;
    }
}