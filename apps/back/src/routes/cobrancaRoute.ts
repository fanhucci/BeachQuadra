import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import CobrancaController from "../controllers/cobrancaController";


const router = Router();
const ctrl = new CobrancaController();
const authMiddleware = new AuthMiddleware();

router.get(`/cobrancas`, authMiddleware.auth, ctrl.listarCobrancas.bind(ctrl));
router.get(`/cobrancas/:id`, authMiddleware.auth, ctrl.listarCobrancasPorId.bind(ctrl));

router.patch(`/cobrancas/:id/pagar`, authMiddleware.auth, ctrl.pagarCobranca.bind(ctrl));
router.patch(`/cobrancas/:id/cancelar`, authMiddleware.auth, ctrl.cancelarCobranca.bind(ctrl));
router.patch(`/cobrancas/:id/estornar`, authMiddleware.auth, ctrl.estornarCobranca.bind(ctrl));
router.patch(`/cobrancas/:id/expirar`, authMiddleware.auth, ctrl.expirarCobranca.bind(ctrl));

export default router;