
import { AlterarStatusContaDTO, AlterarSenhaDTO, CriarContaDTO } from "@app/shared";
import sql from "../infra/db";
import { TransactionSql } from "postgres";

export type sqlExecutor = typeof sql|TransactionSql;

export default class ContaRepository{

    async adicionarConta(executor:sqlExecutor,conta:CriarContaDTO){
        return await executor`insert into contas (id_pessoa, senha) values (${conta.id_pessoa}, ${conta.senha}) returning *`
    }

    async alterarStatus(dados:AlterarStatusContaDTO){
        return await sql`update contas set ativo = not ativo where id_conta = ${dados.id_conta}`;
    }


    // async listarContas(filtro:ContaQueryDTO) {
    //     return await sql`
    //         select id_conta, id_pessoa, ativo
    //         from contas
    //         where 1=1
            

    //         ${filtro.status !== undefined
    //         ? sql`and ativo = ${filtro.status}`
    //         : sql``}
    //         order by id_conta desc
    //     `;
    // }

    async fazerLogin(email:string){
        const [resultado] = await sql`
            select a.id_pessoa,a.id_cargo,b.senha
            from pessoas a
            join contas b on a.id_pessoa = b.id_pessoa
            where a.email = ${email} 
            and a.ativo = true
            limit 1
        `;

        return resultado ?? null
    }

    async contaAtivo(id:number){
        return await sql`select ativo from contas where id_conta = ${id}`;
    }


    async buscarContaPorEmail(email:string){
        const [resposta] = await sql`
            select a.id_conta
            from contas a 
            inner join pessoas b
            on a.id_pessoa = b.id_pessoa
            where b.email = ${email}
        `;
        return resposta ?? null;
    }
    
    async alterarSenhaPorId(id:number,senha:string){
        const [resposta] = await sql`
            update contas c set c.senha = ${senha} where c.id_conta = ${id} 
            joint pessoas p
                on p.id_pessoa = c.id_pessoa 
            returning p.email
        `;
        return resposta;
    }
}