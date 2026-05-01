import { Router } from "express";
import HorarioController from "../controllers/horarioController";
import AuthMiddleware from "../middleware/authMiddleware";



const router = Router();
const ctrl = new HorarioController();
const authMiddleware = new AuthMiddleware();

router.get(`/horario`,authMiddleware.auth, ctrl.listarHorario.bind(ctrl));
router.put(`/horario`,authMiddleware.auth, ctrl.editarHorario.bind(ctrl));


export default router;