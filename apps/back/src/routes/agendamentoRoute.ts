import { Router } from "express";
import AgendamentoController from "../controllers/agendamentoController";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();
const ctrl = new AgendamentoController();
const authMiddleware = new AuthMiddleware();

router.get(`/agendamentos`,authMiddleware.auth, ctrl.listarAgendamentos.bind(ctrl));
router.get(`/agendamentos/:id`,authMiddleware.auth, ctrl.buscarAgendamentoPorId.bind(ctrl));
router.post(`/agendamentos/:id`, authMiddleware.auth, ctrl.cadastrarNovoAgendamento.bind(ctrl));
router.patch(`/agendamentos/:id`, authMiddleware.auth, ctrl.alterarStatusAgendamento.bind(ctrl));

export default router;
