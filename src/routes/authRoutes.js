import { Router } from "express";
import catchAsyncErrors from "../utils/middleware/errorHandlingMiddleware/catchAsyncErrors.js";
import authController from "../controllers/authController.js";
const router = Router();

router.get("/login", catchAsyncErrors(authController.login_get));
router.post("/login", catchAsyncErrors(authController.login_post));
router.get("/signup", catchAsyncErrors(authController.signup_get));
router.post("/signup", catchAsyncErrors(authController.signup_post));
router.get("/logout", catchAsyncErrors(authController.logout_get));

export default router;
