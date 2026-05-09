import { Router } from "express";

import AuthMiddleware from "../middleware/authMiddleware";
import BloqueioController from "../controllers/bloqueioController";

const router = Router();
const ctrl = new BloqueioController();
const authMiddleware = new AuthMiddleware();

router.post(`/bloqueio`, authMiddleware.auth, ctrl.registrarBloqueio.bind(ctrl));
router.delete(`/bloqueio/:id`, authMiddleware.auth, ctrl.deletarBloqueio.bind(ctrl));

export default router;