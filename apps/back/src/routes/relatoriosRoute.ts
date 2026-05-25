import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import RelatoriosController from "../controllers/relatoriosController";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";


const router = Router();
const ctrl = new RelatoriosController();
const authMiddleware = new AuthMiddleware();


router.get(`/relatorios/ocupacao`, authMiddleware.auth, RoleMiddleware.check(Permissao.RELATORIOS), ctrl.listarOcupacao.bind(ctrl));


export default router;