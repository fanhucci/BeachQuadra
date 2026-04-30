import sql from "../infra/db";

export default class ResetTokenRepository{

    async criarToken(id_conta:number,token:string){
        return await sql`
            insert into 
            reset_senha_tokens 
            (token_hash,id_conta,expires_at) 
            values (${token}, ${id_conta}, now() + interval '5 minutes')
            returning *
        `;
    }

    async deletarToken(id_conta:number){
        return await sql`
        delete 
        from reset_senha_tokens 
        where id_conta = ${id_conta}`
    }

    async procurarTokensValidos(){
        return await sql`
        select token_hash, id_conta 
        from reset_senha_tokens
        where now() < expires_at`;
    }

    async removerTokensExpirados(){
        return await sql`
            delete 
            from reset_senha_tokens 
            where now() > expires_at;
        `
    }
}