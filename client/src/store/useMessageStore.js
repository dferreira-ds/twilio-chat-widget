import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/messages`

export const useMessageStore = create(devtools((set, get) => ({
    messages: [],
    createMessage: async (conversationSid, inboundMessage) => {
        try {
            const resp = await fetch(API_URL + "/postMessages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ conversationSid: conversationSid, inboundMessage: inboundMessage }),
            });

            if (resp.ok) {
                const message = await resp.json();
                console.log(message);
            };
        }
        catch (err) {
            console.log(err);
        };
    },
})));