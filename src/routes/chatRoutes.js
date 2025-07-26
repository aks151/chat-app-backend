import express from "express";
import { protect } from '../middlewares/authMiddlewares.js'
import { accessChat } from "../controllers/chatController.js";

const router = express.Router();

// router.use(protect);
router.route('/').post(accessChat);

export default router;