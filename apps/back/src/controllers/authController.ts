import { Request, Response } from "express";
import AuthService from "../services/authService";
import { LoginSchema } from "@app/shared";

export default class AuthController{
    private service = new AuthService();

    async login(req:Request, res:Response){
        const parse = LoginSchema.safeParse(req.body);
        
        if(!parse.success) return res.status(400).json({erro: parse.error.message})
        
        const usuarioAutorizado = await this.service.login(parse.data);

        return res.cookie('token',usuarioAutorizado,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',
                sameSite:"lax",
                maxAge: 8 * 60 * 60 * 1000,
            }).sendStatus(200);
    }

    async logout(req:Request, res:Response){
        res.clearCookie('token').sendStatus(200);
    }

}