import express from "express";
import { protect } from "../middlewares/authMiddlewares.js";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.use(protect);

router.route('/').post(sendMessage);

export default router;