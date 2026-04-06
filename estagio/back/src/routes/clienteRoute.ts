import { Router } from "express";
import ClienteController from "../controllers/clienteController";


const router = Router();
const ctrl = new ClienteController();

router.get(`/clientes`, ctrl.listarClientes.bind(ctrl));
router.post(`/clientes`, ctrl.adicionarCliente.bind(ctrl));
router.put(`/clientes/:id`, ctrl.editarCliente.bind(ctrl));
router.delete(`/clientes/:id`, ctrl.excluirCliente.bind(ctrl));

export default router;