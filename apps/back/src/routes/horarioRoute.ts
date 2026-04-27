import { Router } from "express";
import HorarioController from "../controllers/horarioController";



const router = Router();
const ctrl = new HorarioController();

router.get(`/horario`, ctrl.listarHorario.bind(ctrl));
router.put(`/horario`, ctrl.editarHorario.bind(ctrl));


export default router;