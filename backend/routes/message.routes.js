import express from "express";
import { sendMessage , getMessages , getAllMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { checkTokenMiddleware } from "../middleware/protectRouteToken.js";


const router = express.Router();


router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/all/:id",checkTokenMiddleware, getAllMessages);


export default router;
