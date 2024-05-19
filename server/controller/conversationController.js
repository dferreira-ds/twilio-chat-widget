import asyncHandler from "express-async-handler";
import { twilioClient } from "../utils/utils.js";

//create channel
export const createConversation = asyncHandler (async (req, res) => {
    let conversationSid;

    try {
        const conversation = await twilioClient().conversations.v1.conversations.create({
            friendlyName: "Webchat Conversation",
            xTwilioWebhookEnabled: true,
        });
        
        conversationSid = conversation.sid;
        
        const webhook = await twilioClient().conversations.v1.conversations(conversationSid).webhooks.create({
            "configuration.method": "POST",
            "configuration.filters": ["onMessageAdded"],
            "configuration.flowSid": process.env.TWILIO_STUDIO_FLOW_SID,
            target: "studio",
        });

        const participant = await twilioClient().conversations.v1.conversations(conversation.sid).participants.create({
            identity: "socketio-conversation-user",
        });

        console.log(conversation.sid);
        console.log(webhook.target, webhook.configuration);
        console.log(participant.identity);
    }
    catch (err) {
        return res.status(500).json({ "error": err.message });
    };
    return res.status(200).json({ sid: conversationSid });
});