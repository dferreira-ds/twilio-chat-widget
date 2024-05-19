import { create } from "zustand";
import { devtools } from "zustand/middleware";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api/v1/conversation`

export const useConvesationStore = create(devtools((set, get) => ({
    conversationSid: "",
    createConversation: async () => {
        try {
            const resp = await fetch(API_URL + "/createConversation", {
                method: "POST",
            });

            if (resp.ok) {
                const conversationSid = await resp.json();
                set({ conversationSid: conversationSid.sid });
            };
        }
        catch (err) {
            console.log(err);
        };
    },
})));