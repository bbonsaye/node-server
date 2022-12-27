import { Router } from "express";
import authController from "../controllers/auth.js";

const router = Router();

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);

export default router;
