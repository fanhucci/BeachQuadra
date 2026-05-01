import { Router } from "express";
import ContaController from "../controllers/contaController";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();
const ctrl = new ContaController();
const authMiddleware = new AuthMiddleware();

router.post(`/contas`, authMiddleware.auth, ctrl.adicionarConta.bind(ctrl));
router.post(`/contas/resetar-senha`, ctrl.resetarSenha.bind(ctrl));
router.post(`/contas/esqueci-senha`, ctrl.esqueciSenha.bind(ctrl));
router.patch(`/contas/senha`, authMiddleware.auth, ctrl.alterarSenha.bind(ctrl));
router.patch(`/contas/:id/status`, authMiddleware.auth, ctrl.alterarStatus.bind(ctrl));

export default router;