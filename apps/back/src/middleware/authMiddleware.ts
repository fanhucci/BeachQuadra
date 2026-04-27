import { NextFunction, Request, Response } from "express";
import AppError from "../public/appError";
import jwt from "jsonwebtoken";


export default class AuthMiddleware{

    

    async auth(req:Request, res:Response, next:NextFunction){
        
        
        try {
            const token = req.cookies.token;
        
            if(!token) throw new AppError("Token não informado",401);
      
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET!
            )

            req.user = {
                id:decoded.id,
                cargo:decoded.cargo
            };

            return next();

        } 
        catch (error) {
            return res.status(401).json({ erro: "Token inválido" });
        }
    }
}