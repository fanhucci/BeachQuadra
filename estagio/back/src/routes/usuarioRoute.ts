import { Router } from "express";
import UsuarioController from "../controllers/usuarioController";

const router = Router();
const ctrl = new UsuarioController();

router.get(`/usuarios`, ctrl.listarUsuarios.bind(ctrl));
router.post(`/usuarios`, ctrl.adicionarUsuario.bind(ctrl));
router.put(`/usuarios/:id`, ctrl.editarUsuario.bind(ctrl));
router.delete(`/usuarios/:id`, ctrl.excluirUsuario.bind(ctrl));

export default router;