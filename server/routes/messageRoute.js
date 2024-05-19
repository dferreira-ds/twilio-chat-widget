import express from "express";
import { postMessages } from "../controller/messageController.js";

const router = express.Router();

//message routes
router.post("/postMessages", postMessages);

export default router;