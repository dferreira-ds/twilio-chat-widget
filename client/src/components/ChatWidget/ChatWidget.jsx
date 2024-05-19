import React from "react";
import { Widget } from "@ryaneewx/react-chat-widget"
import { useConvesationStore } from "../../store/useConversationStore";
import { useMessageStore } from "../../store/useMessageStore";
import '@ryaneewx/react-chat-widget/lib/styles.css';

import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatWidget = () => {
    const createConversation = useConvesationStore(state => state.createConversation);
    const conversationSid = useConvesationStore(state => state.conversationSid);
    const createMessage = useMessageStore(state => state.createMessage);

    const handleNewMessage = async (message) => {
        e
        //await createMessage(conversationSid, inboundMessage);
        socket.emit("message", message);
    };

    const handleToggle = async () => {
        await createConversation();
    };

    return (
        <Widget
            handleNewUserMessage={handleNewMessage}
            handleToggle={handleToggle}
        />
    );

};

export default ChatWidget;