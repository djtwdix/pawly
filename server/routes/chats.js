import express from "express";
import {
  createChat,
  getChatsByUserId,
} from "../controllers/ChatControllers.js";
import { getMessagesByChatId } from "../controllers/MessageControllers.js";
const router = express.Router();

router.post("/", createChat);
router.post("/all", getChatsByUserId);
router.get("/:chatId", getMessagesByChatId);

export { router as chatRoutes };
