
import { NovaQuadra, EditarQuadra, QuadraSearch } from "@app/shared";
import sql from "../infra/db";

export default class QuadraRepository {

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

    async adicionarQuadra(quadra:NovaQuadra){
        return await sql`insert into quadras (nome,tipo,status,valor) values (${quadra.nome},${quadra.tipo},${quadra.status}, ${quadra.valor}) returning *`;
    }

    async editarQuadra(quadra:EditarQuadra){
        const campos: string[] = [];
        const valores: any[] = [];

        if(quadra.nome!==undefined){
            valores.push(quadra.nome)
            campos.push(`nome = $${valores.length}`);
        }
        if(quadra.tipo!==undefined){
            valores.push(quadra.tipo)
            campos.push(`tipo = $${valores.length}`);
        }
        if(quadra.status!==undefined){
            valores.push(quadra.status)
            campos.push(`status = $${valores.length}`);
        }
        if(quadra.valor!==undefined){
            valores.push(quadra.valor)
            campos.push(`valor = $${valores.length}`);
        }

        valores.push(quadra.id_quadra);

        return await sql.unsafe(`
            update quadras 
            set ${campos.join(", ")}
            where id_quadra = $${valores.length} 
            returning *
        `,valores);
    }

    async ativarQuadra(id:number){
        return await sql`update quadras set ativo = true where id_quadra = ${id}`;
    } 

    async desativarQuadra(id:number){
        return await sql`update quadras set ativo = false where id_quadra = ${id}`;
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