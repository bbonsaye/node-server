import { Router } from "express";
import { requireUserAuth } from "../utils/middleware/index.js";
import smoothiesController from "../controllers/smoothieController.js";

const router = Router();

router.get("/smoothies", requireUserAuth, smoothiesController.smoothies_get);

export default router;
