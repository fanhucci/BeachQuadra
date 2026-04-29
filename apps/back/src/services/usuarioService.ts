import { PessoaQueryDTO, CadastrarUsuarioSchema,ListarPessoaDTO, CriarContaDTO } from "@app/shared";
import PessoaRepository from "../repositories/pessoaRepository";
import sql from "../public/db";
import ContaRepository from "../repositories/contaRepository";

export default class UsuarioService{

    private pessoa = new PessoaRepository();
    private conta = new ContaRepository();
    
    async listarUsuarios(filtro:PessoaQueryDTO){
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

    async cadastrarUsuario (dados:CadastrarUsuarioSchema){
        return await sql.begin(async (tx)=>{
            const pessoa:ListarPessoaDTO = await this.pessoa.adicionarPessoa(tx, dados);

            const conta:CriarContaDTO = {
                id_pessoa: pessoa.id_pessoa,
                senha:pessoa.senha
            }

            await this.conta.adicionarConta(tx, conta);

        })
    }

}