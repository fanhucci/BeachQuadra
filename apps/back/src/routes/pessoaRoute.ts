import { Router } from "express";
import PessoaController from "../controllers/pessoaController";
import AuthMiddleware from "../middleware/authMiddleware";


const router = Router();
const ctrl = new PessoaController();
const authMiddleware = new AuthMiddleware();

router.post(`/pessoas`, authMiddleware.auth, ctrl.adicionarPessoa.bind(ctrl));
router.patch(`/pessoas/:id`, authMiddleware.auth, ctrl.editarPessoa.bind(ctrl));
router.patch(`/pessoas/:id/status`, authMiddleware.auth, ctrl.alterarStatus.bind(ctrl));

export default router;
