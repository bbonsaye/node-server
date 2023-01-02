import { Router } from "express";
import { loginRequired } from "../utils/middleware//authenticationMiddleware/index.js";
import smoothiesController from "../controllers/smoothieController.js";

const router = Router();

router.get("/smoothies", loginRequired, smoothiesController.smoothies_get);

export default router;
