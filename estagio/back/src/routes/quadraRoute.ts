import { Router } from "express";
import QuadraController from "../controllers/quadraController";



const router = Router();
const ctrl = new QuadraController();

router.get(`/quadras`, ctrl.listarQuadras.bind(ctrl));
router.post(`/quadras`, ctrl.adicionarQuadra.bind(ctrl));
router.put(`/quadras/:id`, ctrl.editarQuadra.bind(ctrl));
router.delete(`/quadras/:id`, ctrl.excluirQuadra.bind(ctrl));

export default router;