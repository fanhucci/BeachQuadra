import { Router } from "express";
import QuadraController from "../controllers/quadraController";
import AuthMiddleware from "../middleware/authMiddleware";



const router = Router();
const ctrl = new QuadraController();
const authMiddleware = new AuthMiddleware();

router.get(`/quadras`, authMiddleware.auth, ctrl.listarQuadras.bind(ctrl));
router.post(`/quadras`, authMiddleware.auth, ctrl.adicionarQuadra.bind(ctrl));
router.patch(`/quadras/:id`, authMiddleware.auth, ctrl.editarQuadra.bind(ctrl));
router.patch(`/quadras/:id/ativar`, authMiddleware.auth, ctrl.ativarQuadra.bind(ctrl));
router.patch(`/quadras/:id/desativar`, authMiddleware.auth, ctrl.desativarQuadra.bind(ctrl));

export default router;