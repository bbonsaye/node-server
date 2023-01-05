import { Router } from "express";
import homePage_get from "../controllers/homePageController.js";
const router = Router();

router.get("/", homePage_get);

export default router;
