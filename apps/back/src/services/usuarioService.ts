import { UsuarioSearch, NovoUsuario, NovoUsuarioProprio, EditarUsuario } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";
import sql from "../infra/db";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import crypto from 'crypto';

export default class UsuarioService{
    private pessoa = new PessoaRepository();
    private conta = new ContaRepository();

    async buscarClientes(busca:string){
        return await this.pessoa.buscarClientes(busca);
    }
    
    async listarUsuarios(filtro:UsuarioSearch){
        return await this.pessoa.listarUsuarios(filtro);
    }

    async listarUsuarioPorId(id_logado:number,id_busca:number){

        const usuario = await this.pessoa.listarUsuarioPorId(id_busca);
        
        const isOwner = id_logado === id_busca

        //const isClient = false;
        //const isAdmin =  isClient && true;

        const resposta = {
            usuario,
            permissions:{
                canEdit: isOwner,
                canChangePassword: isOwner,
                canResetPassword: !isOwner,
                canActivateAccount: !isOwner,
                canDeactivateAccount: !isOwner,
                canDelete: isOwner,
            }
        }
        return resposta;
    }

    async adicionarUsuarioProprio (dados:NovoUsuarioProprio ){
        return await sql.begin(async (tx)=>{
            const [pessoa] = await this.pessoa.adicionarPessoa(tx, dados);

            const senhaHash = await bcrypt.hash(dados.senha,10);

            await this.conta.adicionarConta(tx, {
                id_pessoa:pessoa.id_pessoa,
                senha:senhaHash
            });
            return pessoa;
        })
    }

    async adicionarUsuario(dados:NovoUsuario){
        return await sql.begin(async (tx)=>{
            const [pessoa] = await this.pessoa.adicionarPessoa(tx,dados);

            const senhaFake = crypto.randomBytes(32).toString('hex');
            const senhaHash = await bcrypt.hash(senhaFake,10)

            await this.conta.adicionarConta(tx,{
                id_pessoa:pessoa.id_pessoa,
                senha:senhaHash
            })
            return pessoa
        })
    }
    
    async editarUsuario(dados:EditarUsuario){
        return await this.pessoa.editarPessoa(dados);
    }

    async ativarUsuario(id:number){
        return await this.pessoa.ativarPessoa(id);
    }

    async desativarUsuario(id:number){
        return await this.pessoa.desativarPessoa(id);
    }

}