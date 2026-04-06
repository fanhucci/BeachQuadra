
import { EditarClienteDTO, NovoClienteDTO } from "@shared/schemas/clienteSchema";
import ClienteRepository from "../repositories/clienteRepository";


export default class ClienteService{
    private repo = new ClienteRepository();

    async listarClientes(){
        return await this.repo.listarClientes();
    }

    async adicionarCliente(cliente:NovoClienteDTO){
        return await this.repo.adicionarCliente(cliente);
    }

    async editarCliente(cliente:EditarClienteDTO){
        return await this.repo.editarCliente(cliente);
    }

    async excluirCliente(id:number){
        return await this.repo.excluirCliente(id);
    }
}