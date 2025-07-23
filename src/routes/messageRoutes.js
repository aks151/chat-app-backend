import express from "express";
import { protect } from "../middlewares/authMiddlewares";
import { sendMessage } from "../controllers/messageController";

const router = express.Router();

router.use(protect);

router.route('/').post(sendMessage);

export default router;