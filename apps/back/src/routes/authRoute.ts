import { Router } from "express";
import AuthController from "../controllers/authController";


const router = Router();
const ctrl = new AuthController();


router.post(`/login`, ctrl.login.bind(ctrl));
router.post(`/logout`, ctrl.logout.bind(ctrl));

export default router;