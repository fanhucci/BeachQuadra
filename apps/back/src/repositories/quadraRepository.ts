
import { QuadraSearch, NovaQuadra, EditarQuadra } from "@app/shared";
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
            ? sql`and tipo = ${filtro.tipo}::"QuadraTypesEnum"`
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
        return await sql`
            insert into quadras 
            (nome,tipo,status,valor) 
            values (${quadra.nome},${quadra.tipo},${quadra.status}, ${quadra.valor}) 
            returning *
        `;
    }

    async editarQuadra(quadra:EditarQuadra){
        const {id_quadra, ...dados} = quadra;

        const dadosParaAtualizar = Object.fromEntries(
            Object.entries(dados).filter(([_, v]) => v !== undefined)
        );

        if(Object.keys(dadosParaAtualizar).length === 0 ) return;

        return await sql`
            update quadras 
            set ${sql(dadosParaAtualizar)}
            where id_quadra = ${id_quadra} 
            returning *
        `;
    }

    async ativarQuadra(id:number){
        return await sql`
            update quadras 
            set ativo = true 
            where id_quadra = ${id}
        `;
    } 

    async desativarQuadra(id:number){
        return await sql`
            update quadras 
            set ativo = false 
            where id_quadra = ${id}
        `;
    } 

}