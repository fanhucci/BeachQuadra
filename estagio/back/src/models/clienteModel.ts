export type clienteType = {
    id?:number,
    nome:string,
    cpf:string,
    telefone:string,
}

export default class ClienteModel{
    #id;
    #nome;
    #cpf;
    #telefone;

    constructor(){

    }

    async adicionarCliente(){

    }
}