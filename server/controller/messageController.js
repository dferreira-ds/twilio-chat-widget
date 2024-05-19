import asyncHandler from "express-async-handler";
import { twilioClient } from "../utils/utils.js";

//Get message
export const postMessages = asyncHandler (async (req, res) => {
    const { conversationSid, inboundMessage } = req.body;

    try {
        const message = await twilioClient().conversations.v1.conversations(conversationSid).messages.create({
            author: "socketio-conversation-user",
            body: inboundMessage,
            xTwilioWebhookEnabled: true,
        });

        console.log(message)
    }
    catch (err) {
        return res.status(500).json({ "error": err.message });
    };
    return res.status(200).json({ success: true });
});