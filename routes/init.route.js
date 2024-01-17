import express from "express";
import dotenv from "dotenv";
import initController from "../controllers/init.controller.js"

dotenv.config();
const router = express.Router();

router.get("/init", initController.init)

export default router;