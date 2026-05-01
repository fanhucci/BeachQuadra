import { Router } from "express";
import QuadraController from "../controllers/quadraController";
import AuthMiddleware from "../middleware/authMiddleware";



const router = Router();
const ctrl = new QuadraController();
const authMiddleware = new AuthMiddleware();

router.get(`/quadras`, authMiddleware.auth, ctrl.listarQuadras.bind(ctrl));
router.post(`/quadras`, authMiddleware.auth, ctrl.adicionarQuadra.bind(ctrl));
router.put(`/quadras/:id`, authMiddleware.auth, ctrl.editarQuadra.bind(ctrl));
router.patch(`/quadras/:id`, authMiddleware.auth, ctrl.ativarQuadra.bind(ctrl));
router.delete(`/quadras/:id`, authMiddleware.auth, ctrl.excluirQuadra.bind(ctrl));

export default router;