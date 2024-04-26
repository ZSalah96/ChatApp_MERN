import express from "express";
import { checkTokenMiddleware } from "../middleware/protectRouteToken.js";
import { getConversations } from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/:userId", checkTokenMiddleware ,getConversations);

export default router;