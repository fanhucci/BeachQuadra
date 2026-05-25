import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import CobrancaController from "../controllers/cobrancaController";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";


const router = Router();
const ctrl = new CobrancaController();
const authMiddleware = new AuthMiddleware();

router.get(`/cobrancas`, authMiddleware.auth, RoleMiddleware.check(Permissao.COBRANCAS), ctrl.listarCobrancas.bind(ctrl));
router.get(`/cobrancas/:id`, authMiddleware.auth, ctrl.listarCobrancasPorId.bind(ctrl));

router.patch(`/cobrancas/:id/pagar`, authMiddleware.auth, RoleMiddleware.check(Permissao.ADMINISTRADORES), ctrl.pagarCobranca.bind(ctrl));
router.patch(`/cobrancas/:id/cancelar`, authMiddleware.auth, RoleMiddleware.check(Permissao.ADMINISTRADORES), ctrl.cancelarCobranca.bind(ctrl));
router.patch(`/cobrancas/:id/estornar`, authMiddleware.auth, RoleMiddleware.check(Permissao.ADMINISTRADORES), ctrl.estornarCobranca.bind(ctrl));
router.patch(`/cobrancas/:id/expirar`, authMiddleware.auth, RoleMiddleware.check(Permissao.ADMINISTRADORES), ctrl.expirarCobranca.bind(ctrl));

export default router;