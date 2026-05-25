import { Router } from "express";
import QuadraController from "../controllers/quadraController";
import AuthMiddleware from "../middleware/authMiddleware";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";


const router = Router();
const ctrl = new QuadraController();
const authMiddleware = new AuthMiddleware();

router.get(`/quadras`, authMiddleware.auth, RoleMiddleware.check(Permissao.QUADRAS), ctrl.listarQuadras.bind(ctrl));
router.post(`/quadras`, authMiddleware.auth, RoleMiddleware.check(Permissao.QUADRAS), ctrl.adicionarQuadra.bind(ctrl));
router.patch(`/quadras/:id`, authMiddleware.auth, RoleMiddleware.check(Permissao.QUADRAS), ctrl.editarQuadra.bind(ctrl));
router.patch(`/quadras/:id/ativar`, authMiddleware.auth, RoleMiddleware.check(Permissao.QUADRAS), ctrl.ativarQuadra.bind(ctrl));
router.patch(`/quadras/:id/desativar`, authMiddleware.auth, RoleMiddleware.check(Permissao.QUADRAS), ctrl.desativarQuadra.bind(ctrl));

export default router;