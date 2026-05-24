import { UsuarioHistoricoSearch, UsuarioSearch, NovoUsuario, NovoUsuarioProprio, EditarUsuario } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";
import sql from "../infra/db";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import AppError from "../infra/appError";

interface User {
    id:number;
    cargo:number;
}

export default class UsuarioService{
    private pessoa = new PessoaRepository();
    private conta = new ContaRepository();

    async buscarClientes(busca:string){
        return await this.pessoa.buscarClientes(busca);
    }
    
    async listarUsuarios(filtro:UsuarioSearch){
        return await this.pessoa.listarUsuarios(filtro);
    }

    async listarUsuarioPorId(user:User, id_busca:number){

        const id = Number(user.id);
        const cargo = Number(user.cargo);

        if (id_busca === id) {
            return await this.pessoa.listarUsuarioPorId(id_busca);
        }

        if (cargo < 2) {
            throw new AppError('Sem autorização', 403);
        }

        return await this.pessoa.listarUsuarioPorId(id_busca);
    }

    async listarHistoricoPerfil(user:User, id_perfil:number, filtro:UsuarioHistoricoSearch){
        const id = Number(user.id);
        const cargo = Number(user.cargo);


        if (id_perfil === id) {
            return await this.pessoa.listarHistorico(id_perfil,filtro);
        }

        if (cargo < 2) {
            throw new AppError('Sem autorização', 403);
        }

        return await this.pessoa.listarHistorico(id_perfil,filtro);
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
    
    async editarUsuario(user: User, dados: EditarUsuario) {
        const id = Number(user.id);
        const cargo = Number(user.cargo);

        const isOwner = dados.id_pessoa === id;

        if (cargo < 2 && !isOwner) {
            throw new AppError('Sem autorização para editar outros usuários', 403);
        }

        if (dados.id_cargo !== undefined && cargo < 3) {
            throw new AppError('Você não tem permissão para alterar cargos', 403);
        }

        return await this.pessoa.editarPessoa(dados);
    }

    async ativarUsuario(id:number){
        return await this.pessoa.ativarPessoa(id);
    }

    async desativarUsuario(id:number){
        return await this.pessoa.desativarPessoa(id);
    }

}