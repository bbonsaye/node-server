import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();

function catchErrors(fn) {
	return function inner(req, res, next) {
		Promise.resolve(fn(req, res, next).catch(next));
	};
}

// const catchErrors = (fn) => (req, res, next) => {
// 	Promise.resolve(fn(req, res, next)).catch(next);
// };

router.get("/login", catchErrors(authController.login_get));
router.post("/login", catchErrors(authController.login_post));
router.get("/signup", catchErrors(authController.signup_get));
router.post("/signup", catchErrors(authController.signup_post));
router.get("/logout", catchErrors(authController.logout_get));

export default router;
