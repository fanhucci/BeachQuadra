import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import RelatoriosController from "../controllers/relatoriosController";



const router = Router();
const ctrl = new RelatoriosController();
const authMiddleware = new AuthMiddleware();

router.get(`/relatorios/ocupacao`, authMiddleware.auth, ctrl.listarOcupacao.bind(ctrl));


export default router;