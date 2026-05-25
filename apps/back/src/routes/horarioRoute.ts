import { Router } from "express";
import HorarioController from "../controllers/horarioController";
import AuthMiddleware from "../middleware/authMiddleware";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";


const router = Router();
const ctrl = new HorarioController();
const authMiddleware = new AuthMiddleware();

router.get(`/horario`,authMiddleware.auth, RoleMiddleware.check(Permissao.HORARIOS), ctrl.listarHorario.bind(ctrl));
router.get(`/horario-disponivel`, ctrl.listarHorariosDisponiveis.bind(ctrl));
router.get(`/horario-disponivel/:id`, authMiddleware.auth, RoleMiddleware.check(Permissao.AGENDA), ctrl.listarAgendaDeQuadraPorId.bind(ctrl));
router.get(`/horario/agenda`, authMiddleware.auth, RoleMiddleware.check(Permissao.AGENDA), ctrl.listarAgenda.bind(ctrl));
router.put(`/horario`,authMiddleware.auth, RoleMiddleware.check(Permissao.HORARIOS), ctrl.editarHorario.bind(ctrl));


export default router;