import { Router } from "express";
import tryCatch from "../utils/middleware/errorHandlingMiddleware/tryCatch.js";
import authController from "../controllers/authController.js";
const router = Router();

router.get("/login", tryCatch(authController.login_get));
router.post("/login", tryCatch(authController.login_post));
router.get("/signup", tryCatch(authController.signup_get));
router.post("/signup", tryCatch(authController.signup_post));
router.get("/logout", tryCatch(authController.logout_get));

export default router;
