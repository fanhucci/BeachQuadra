
import { AlterarPessoaDTO, CriarPessoaDTO, PessoaQueryDTO } from "@app/shared";
import sql from "../public/db";
import { sqlExecutor } from "./contaRepository";

export default class PessoaRepository {

    async adicionarPessoa(executor:sqlExecutor,dados:CriarPessoaDTO){
        return await executor`insert into pessoas (nome, cpf, telefone, email, id_cargo) values (${dados.nome},${dados.cpf},${dados.telefone}, ${dados.email}, ${dados.id_cargo}) returning *`;
    }


    async editarPessoa(dados: AlterarPessoaDTO) {
  
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

        if (dados.ativo !== undefined) {
            valores.push(dados.ativo);
            campos.push(`ativo = $${valores.length}`);
        }

        valores.push(dados.id_pessoa);

        return await sql.unsafe(`
            update pessoas
            set ${campos.join(", ")}
            where id_pessoa = $${valores.length}
            returning *
        `, valores);
    }

    async listarUsuarios(filtro: PessoaQueryDTO) {

        const mapaColunas:Record<number,string> = {
            1: "a.nome",
            2: "a.cpf",
            3: "a.email"
        };

        const coluna = mapaColunas[filtro.tipo];

        let where = sql`where true`;

        if (filtro.search && coluna) {
            where = sql`${where} and ${sql.unsafe(coluna)} like ${'%' + filtro.search + '%'}`;
        }

        if (filtro.id_cargo !== undefined) {
            where = sql`${where} and a.id_cargo = ${filtro.id_cargo}`;
        }

        if (filtro.ativo !== undefined) {
            where = sql`${where} and a.ativo = ${filtro.ativo}`;
        }

        return await sql`
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
            ${where}
            order by a.id_pessoa
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

}