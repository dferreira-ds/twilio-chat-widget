import express from "express";
import { createConversation } from "../controller/conversationController.js";

const router = express.Router();

//message routes
router.post("/createConversation", createConversation);

export default router;