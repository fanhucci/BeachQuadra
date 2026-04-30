import { Router } from "express";
import ContaController from "../controllers/contaController";

const router = Router();
const ctrl = new ContaController();

router.post(`/contas`, ctrl.adicionarConta.bind(ctrl));
router.post(`/contas/redefinir-senha`, ctrl.redefinirSenha.bind(ctrl));
router.post(`/contas/esqueci-senha`, ctrl.esqueciSenha.bind(ctrl));
router.patch(`/contas/senha`, ctrl.alterarSenha.bind(ctrl));
router.patch(`/contas/:id/status`, ctrl.alterarStatus.bind(ctrl));

export default router;