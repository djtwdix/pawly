import express from "express"
import { createChat, getChatsByUserId,} from "../controllers/ChatControllers.js"
const router = express.Router();

router.post("/", createChat);
router.get("/", getChatsByUserId)
router.get("/:chatId/messages", getMessagesByChatId);


export {router as chatRoutes};