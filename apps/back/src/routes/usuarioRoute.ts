import { Router } from "express";
import UsuarioController from "../controllers/usuarioController";
import AuthMiddleware from "../middleware/authMiddleware";


const router = Router();
const ctrl = new UsuarioController();
const authMiddleware = new AuthMiddleware();

router.get(`/usuarios`, authMiddleware.auth, ctrl.listarUsuarios.bind(ctrl));
router.get(`/usuarios/perfil`, authMiddleware.auth, ctrl.listarUsuarioPerfil.bind(ctrl));
router.get(`/usuarios/:id`, authMiddleware.auth, ctrl.listarUsuarioPorId.bind(ctrl));


export default router;