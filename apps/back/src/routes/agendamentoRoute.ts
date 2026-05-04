import { Router } from "express";
import AgendamentoController from "../controllers/agendamentoController";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();
const ctrl = new AgendamentoController();
const authMiddleware = new AuthMiddleware();

router.get(`/agendamento`,authMiddleware.auth, ctrl.listarAgendamentos.bind(ctrl));
router.get(`/agendamento/:id`,authMiddleware.auth, ctrl.buscarAgendamentoPorId.bind(ctrl));
router.post(`/agendamento/:id`, authMiddleware.auth, ctrl.cadastrarNovoAgendamento.bind(ctrl));
router.patch(`/agendamento/:id`, authMiddleware.auth, ctrl.alterarStatusAgendamento.bind(ctrl));

export default router;
