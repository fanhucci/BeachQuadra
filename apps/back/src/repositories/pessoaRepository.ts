
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

    async buscarClientes(busca: string) {
        const termo = `%${busca}%`;
        const apenasNumeros = busca.replace(/\D/g, '');
        
        const termoCPF = apenasNumeros !== '' ? `%${apenasNumeros}%` : null;

        return await sql`
            select * 
            from pessoas
            where (nome ilike ${termo})
                ${termoCPF ? sql`or (cpf ilike ${termoCPF})` : sql``}
            and ativo = true
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
        const { search, tipo, id_cargo, ativo, page = 1, limit = 10 } = filtro;

        const offset = (Number(page) - 1) * Number(limit);

        const mapaColunas: Record<string, string> = {
            'nome': "a.nome",
            'cpf': "a.cpf",
            'email': "a.email"
        };
        const colunaDefinida = mapaColunas[tipo] ?? null;

        const searchTexto = search ?? null;
        const searchCargo = id_cargo ?? null;
        const searchAtivo = ativo !== undefined ? ativo : null;

        return await sql`
            with query_filtrada as (
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
                where 1=1
                    -- Filtro dinâmico por coluna de busca text (ILIKE)
                    and (
                        ${searchTexto}::text is null 
                        or ${colunaDefinida ? sql.unsafe(colunaDefinida) : sql`a.nome`} ilike '%' || ${searchTexto}::text || '%'
                    )
                    -- Filtro por Cargo
                    and (${searchCargo}::int is null or a.id_cargo = ${searchCargo}::int)
                    -- Filtro por Ativo (boolean)
                    and (${searchAtivo}::boolean is null or a.ativo = ${searchAtivo}::boolean)
            ),
            total_registros as (
                select count(*) as total from query_filtrada
            )
            select 
                q.*,
                t.total::int as total_geral
            from query_filtrada q
            cross join total_registros t
            order by q.id_pessoa
            limit ${Number(limit)}
            offset ${offset};
        `;
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