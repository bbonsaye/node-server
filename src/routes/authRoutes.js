import { Router } from "express";

import authController from "../controllers/authController.js";
import { handleLoginErrors, handleSignupErrors } from "../utils/middleware/errorHandlingMiddleware/index.js";

const router = Router();

router.get("/login", authController.login_get);
router.post("/login", authController.login_post, handleLoginErrors);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post, handleSignupErrors);
router.get("/logout", authController.logout_get);

export default router;
