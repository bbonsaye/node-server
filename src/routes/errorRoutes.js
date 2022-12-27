import { Router } from "express";
import errorController from "../controllers/error.js";

const router = Router();

router.use(errorController.pageNotFound);

export default router;
