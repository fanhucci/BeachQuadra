import { Router } from "express";
import AgendamentoController from "../controllers/agendamentoController";
import AuthMiddleware from "../middleware/authMiddleware";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";

const router = Router();
const ctrl = new AgendamentoController();
const authMiddleware = new AuthMiddleware();

router.get(`/agendamentos`,authMiddleware.auth,  RoleMiddleware.check(Permissao.AGENDAMENTOS), ctrl.listarAgendamentos.bind(ctrl));
router.get(`/agendamentos/:id`,authMiddleware.auth, RoleMiddleware.check(Permissao.AGENDAMENTOS), ctrl.buscarAgendamentoPorId.bind(ctrl));
router.post(`/agendamentos`, authMiddleware.auth, RoleMiddleware.check(Permissao.AGENDAMENTOS), ctrl.cadastrarNovoAgendamento.bind(ctrl));


export default router;
