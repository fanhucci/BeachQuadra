
import { EditarUsuario, NovoUsuario, UsuarioSearch, } from "@app/shared";
import sql from "../infra/db";
import { sqlExecutor } from "./contaRepository";

export default class PessoaRepository {

    async adicionarPessoa(executor:sqlExecutor,dados:NovoUsuario){
        return await executor`
            insert into pessoas 
            (nome, cpf, telefone, email, id_cargo) 
            values (${dados.nome},${dados.cpf},${dados.telefone}, ${dados.email}, ${dados.id_cargo}) 
            returning *
        `;
    }

    async buscarClientes(busca:string){
        return await sql`
            select * 
            from pessoas
            where nome ilike %${busca}%
            or cpf ilike %${busca}%
            or email ilike %${busca}%
            limit 10
        `;
    }


    async editarPessoa(dados: EditarUsuario) {
  
        const campos: string[] = [];
        const valores: any[] = [];

        if (dados.nome !== undefined) {
            valores.push(dados.nome);
            campos.push(`nome = $${valores.length}`);
        }

        if (dados.cpf !== undefined) {
            valores.push(dados.cpf);
            campos.push(`cpf = $${valores.length}`);
        }

        if (dados.telefone !== undefined) {
            valores.push(dados.telefone);
            campos.push(`telefone = $${valores.length}`);
        }

        if (dados.email !== undefined) {
            valores.push(dados.email);
            campos.push(`email = $${valores.length}`);
        }

        if (dados.id_cargo !== undefined) {
            valores.push(dados.id_cargo);
            campos.push(`id_cargo = $${valores.length}`);
        }


        valores.push(dados.id_pessoa);

        return await sql.unsafe(`
            update pessoas
            set ${campos.join(", ")}
            where id_pessoa = $${valores.length}
            returning *
        `, valores);
    }

    async listarUsuarios(filtro: UsuarioSearch) {
        const mapaColunas: Record<string, string> = {
            'nome': "a.nome",
            'cpf': "a.cpf",
            'email': "a.email"
        };

        const coluna = mapaColunas[filtro.tipo];

        const query = sql`
            select 
                a.id_pessoa, 
                b.id_conta, 
                a.nome, 
                a.cpf, 
                a.email, 
                a.telefone, 
                c.id_cargo,
                c.nome as cargo, 
                a.ativo
            from pessoas a
            left join contas b on a.id_pessoa = b.id_pessoa
            inner join cargos c on a.id_cargo = c.id_cargo
            where true
            ${filtro.search && coluna 
                ? sql`and ${sql.unsafe(coluna)} ilike ${'%' + filtro.search + '%'}` 
                : sql``}
            ${filtro.id_cargo !== undefined 
                ? sql`and a.id_cargo = ${filtro.id_cargo}` 
                : sql``}
            ${filtro.ativo !== undefined 
                ? sql`and a.ativo = ${filtro.ativo}` 
                : sql``}
            order by a.id_pessoa
        `;

        return await query;
    }

    async listarUsuarioPorId(id:number){
        const [usuario] = await sql`
            select 
            a.id_pessoa, 
            b.id_conta, 
            a.nome, 
            a.cpf, 
            a.email, 
            a.telefone, 
            c.id_cargo,
            c.nome as cargo, 
            a.ativo
            from pessoas a
            left join contas b on a.id_pessoa = b.id_pessoa
            inner join cargos c on a.id_cargo = c.id_cargo
            where a.id_pessoa = ${id}
        `
        return usuario ?? null;
    }

    async alterarStatus(id:number,status:boolean){
        return await sql`update pessoas set ativo = ${status} where id_pessoa = ${id}`;
    }

    async ativarPessoa(id:number){
        return await sql`
            update pessoas
            set ativo = true
            where id_pessoa = ${id}
        `;
    }

    async desativarPessoa(id:number){
        return await sql`
            update pessoas
            set ativo = false
            where id_pessoa = ${id}
        `;
    }


}