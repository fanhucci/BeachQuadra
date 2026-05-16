import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import CobrancaController from "../controllers/cobrancaController";


const router = Router();
const ctrl = new CobrancaController();
const authMiddleware = new AuthMiddleware();

router.get(`/cobrancas`, authMiddleware.auth, ctrl.listarCobrancas.bind(ctrl));
router.get(`/cobrancas/:id`, authMiddleware.auth, ctrl.listarCobrancasPorId.bind(ctrl));

router.post(`/cobrancas/:id/pagar`, authMiddleware.auth, ctrl.pagarCobranca.bind(ctrl));

export default router;