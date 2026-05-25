import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import BloqueioController from "../controllers/bloqueioController";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";

const router = Router();
const ctrl = new BloqueioController();
const authMiddleware = new AuthMiddleware();

router.post(`/bloqueio`, authMiddleware.auth, RoleMiddleware.check(Permissao.BLOQUEIOS), ctrl.registrarBloqueio.bind(ctrl));
router.delete(`/bloqueio/:id`, authMiddleware.auth, RoleMiddleware.check(Permissao.BLOQUEIOS), ctrl.deletarBloqueio.bind(ctrl));

export default router;