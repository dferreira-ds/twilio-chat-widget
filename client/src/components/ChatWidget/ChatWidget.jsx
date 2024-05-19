import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "@ryaneewx/react-chat-widget"
import { useConvesationStore } from "../../store/useConversationStore";
import { useMessageStore } from "../../store/useMessageStore";
import '@ryaneewx/react-chat-widget/lib/styles.css';

import io from "socket.io-client";
const socket = io(process.env.REACT_APP_NGROK_URL);

const ChatWidget = () => {
    const createConversation = useConvesationStore(state => state.createConversation);
    const conversationSid = useConvesationStore(state => state.conversationSid);
    const createMessage = useMessageStore(state => state.createMessage);

    const handleNewMessage = async (message) => {
        await createMessage(conversationSid, message);
        socket.emit("message", message);
    };

    const handleToggle = async () => {
        await createConversation();
    };

    useEffect(() => {
        const handleFlexMessage = (data) => {
            if (data.Source === "SDK") {
                addResponseMessage(data.Body);
            };
        };

        socket.on("message", handleFlexMessage)
        return () => socket.off("message", handleFlexMessage);
    }, []);

    return (
        <Widget
            handleNewUserMessage={handleNewMessage}
            handleToggle={handleToggle}
        />
    );

};

export default ChatWidget;