import { Router } from "express";
import catchAsyncErrors from "../utils/middleware/errorHandlingMiddleware/catchAsyncErrors.js";
import authController from "../controllers/authController.js";
import { handleLoginErrors, handleSignupErrors } from "../utils/middleware/errorHandlingMiddleware/index.js";

const router = Router();

router.get("/login", authController.login_get);
router.post("/login", catchAsyncErrors(authController.login_post), handleLoginErrors);
router.get("/signup", authController.signup_get);
router.post("/signup", catchAsyncErrors(authController.signup_post), handleSignupErrors);
router.get("/logout", authController.logout_get);

export default router;
