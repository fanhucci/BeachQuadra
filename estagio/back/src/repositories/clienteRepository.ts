import { EditarClienteDTO, NovoClienteDTO } from "@shared/schemas/clienteSchema";
import sql from "../public/db";

export default class ClienteRepository {

    async adicionarCliente(cliente:NovoClienteDTO){
        return await sql`insert into clientes (nome,cpf,telefone) values (${cliente.nome},${cliente.cpf},${cliente.telefone}) returning *`;
    }

    async excluirCliente(id:number){
        return await sql`delete from clientes where id_cliente = ${id}`;
    } 

    async editarCliente(cliente:EditarClienteDTO){
        return await sql`update clientes set nome = ${cliente.nome}, cpf = ${cliente.cpf}, telefone = ${cliente.telefone} where id_cliente = ${cliente.id_cliente} returning *`;
    }

    async listarClientes(){
        return await sql`select * from clientes order by id_cliente`;
    }

    // async buscarCliente(id:number){
    //     if(!id) throw new Error(`ID é obrigatorio para buscar clientes`);
    //     return await sql`select * from clientes where  id = ${id}`;

    // }

}