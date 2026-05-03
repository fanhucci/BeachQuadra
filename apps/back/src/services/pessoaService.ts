


import { AlterarPessoaDTO, CriarPessoaDTO, PessoaQueryDTO } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";
import sql from "../infra/db";
import ContaRepository from "../repositories/contaRepository";
import bcrypt from "bcrypt";
import crypto from 'crypto';

export default class PessoaService{
    private pessoa = new PessoaRepository();
    private conta = new ContaRepository();

    async adicionarPessoa(dados:CriarPessoaDTO){
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

    async editarPessoa(dados:AlterarPessoaDTO){
        return await this.pessoa.editarPessoa(dados);
    }

    async alterarStatus(id:number,status:boolean){
        return await this.pessoa.alterarStatus(id,status);
    }


}