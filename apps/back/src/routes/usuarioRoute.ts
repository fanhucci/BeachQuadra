import { Router } from "express";
import UsuarioController from "../controllers/usuarioController";
import AuthMiddleware from "../middleware/authMiddleware";
import RoleMiddleware from "../middleware/roleMiddleware";
import { Permissao } from "../infra/roles";


const router = Router();
const ctrl = new UsuarioController();
const authMiddleware = new AuthMiddleware();

//publica
router.post(`/usuarios/proprio`, ctrl.adicionarUsuarioProprio.bind(ctrl));

//clientes
router.get(`/usuarios/perfil`, authMiddleware.auth, ctrl.listarUsuarioPerfil.bind(ctrl));
router.get(`/usuarios/:id/historico`, authMiddleware.auth, ctrl.listarHistorico.bind(ctrl));
router.patch(`/usuarios/:id`, authMiddleware.auth, ctrl.editarUsuario.bind(ctrl));

//administrativo
router.get(`/usuarios`, authMiddleware.auth, RoleMiddleware.check(Permissao.CLIENTES), ctrl.listarUsuarios.bind(ctrl));
router.get(`/usuarios/clientes`, authMiddleware.auth, RoleMiddleware.check(Permissao.CLIENTES), ctrl.buscarClientes.bind(ctrl));
router.get(`/usuarios/:id`, authMiddleware.auth, RoleMiddleware.check(Permissao.CLIENTES), ctrl.listarUsuarioPorId.bind(ctrl));
router.post(`/usuarios`, authMiddleware.auth, RoleMiddleware.check(Permissao.CLIENTES), ctrl.adicionarUsuario.bind(ctrl));
router.patch(`/usuarios/:id/ativar`, authMiddleware.auth, RoleMiddleware.check(Permissao.CLIENTES), ctrl.ativarUsuario.bind(ctrl));
router.patch(`/usuarios/:id/desativar`, authMiddleware.auth, RoleMiddleware.check(Permissao.CLIENTES), ctrl.desativarUsuario.bind(ctrl));











export default router;