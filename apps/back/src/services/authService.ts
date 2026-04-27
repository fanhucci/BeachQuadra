import { LoginDTO } from "@app/shared";
import AppError from "../public/appError";
import ContaRepository from "../repositories/contaRepository"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthService{
    private repo = new ContaRepository();

    async login(dados:LoginDTO){
        const usuarioExiste = await this.repo.fazerLogin(dados.email);
        
        if(!usuarioExiste) throw new AppError("Credenciais inválidas", 401);

        const senhaCorreta = await bcrypt.compare(
            dados.senha,
            usuarioExiste.senha
        )
   
        if(!senhaCorreta) throw new AppError("Credenciais inválidas", 401);

        const token = jwt.sign(
            {
                id:usuarioExiste.id_pessoa,
                cargo:usuarioExiste.id_cargo
            },process.env.JWT_SECRET!,{expiresIn:"8h"}
        )
        
        return token
    }
}