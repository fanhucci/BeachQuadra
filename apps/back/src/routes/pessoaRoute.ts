import { Router } from "express";
import PessoaController from "../controllers/pessoaController";


const router = Router();
const ctrl = new PessoaController();

router.get(`/pessoas`, ctrl.listarPessoas.bind(ctrl));
router.post(`/pessoas`, ctrl.adicionarPessoa.bind(ctrl));
router.patch(`/pessoas/:id`, ctrl.editarPessoa.bind(ctrl));
router.patch(`/pessoas/:id/status`, ctrl.alterarStatus.bind(ctrl));

export default router;