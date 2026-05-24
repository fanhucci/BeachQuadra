import { Request, Response, NextFunction } from "express";
import { Permissao, ROLES_PERMISSIONS } from "../infra/roles";


export default class RoleMiddleware {

    static check(requiredPermission: Permissao) {
        
        return (req: Request, res: Response, next: NextFunction) => {
        
            if (!req.user) {
                return res.status(401).json({ erro: "Usuário não autenticado" });
            }
            
            const { cargo } = req.user; 

            const allowedPermissions = ROLES_PERMISSIONS[cargo];

            if (!allowedPermissions || !allowedPermissions.includes(requiredPermission)) {
                return res.status(403).json({ 
                    erro: "Acesso negado: Você não possui a permissão necessária." 
                });
            }

            return next();
        };
    }
}