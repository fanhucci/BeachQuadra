
import { NovaQuadra, EditarQuadra, QuadraSearch } from "@app/shared";
import sql from "../infra/db";

export default class QuadraRepository {

    async adicionarQuadra(quadra:NovaQuadra){
        return await sql`insert into quadras (nome,tipo,status,valor) values (${quadra.nome},${quadra.tipo},${quadra.status}, ${quadra.valor}) returning *`;
    }

    async ativarQuadra(id:number){
        return await sql`update quadras set ativo = true where id_quadra = ${id}`;
    } 

    async desativarQuadra(id:number){
        return await sql`update quadras set ativo = false where id_quadra = ${id}`;
    } 


    async editarQuadra(quadra:EditarQuadra){
        return await sql`update quadras set nome = ${quadra.nome}, tipo = ${quadra.tipo}, status = ${quadra.status}, valor = ${quadra.valor} where id_quadra = ${quadra.id_quadra} returning *`;
    }

    async listarQuadras(filtro:QuadraSearch){
        return await sql`select * from quadras 
            where 1=1

            ${filtro.search
                ?sql`and nome like ${'%'+filtro.search+'%'}`
                :sql``
            }

            ${filtro.tipo
            ? sql`and tipo = ${filtro.tipo}`
            : sql``}
                
            ${filtro.status !== undefined
            ? sql`and status = ${filtro.status}`
            : sql``}

            ${filtro.ativo !== undefined
            ? sql`and ativo = ${filtro.ativo}`
            : sql``}

            order by id_quadra desc`;
    }

    async quadraExistente(nome:string, id?:number){
        const result = await sql`
            select exists(
            select 1
            from quadras
            where nome = ${nome}
            ${id? sql`and id_quadra != ${id}` : sql``}
            )
        `;

        return result[0].exists;
    }

}