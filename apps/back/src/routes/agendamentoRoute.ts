import { Router } from "express";
import AgendamentoController from "../controllers/agendamentoController";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();
const ctrl = new AgendamentoController();
const authMiddleware = new AuthMiddleware();

router.post(`/agendamento`, authMiddleware.auth, ctrl.cadastrarNovoAgendamento.bind(ctrl));
router.patch(`/agendamento/:id`, authMiddleware.auth, ctrl.alterarStatusAgendamento.bind(ctrl));

export default router;
