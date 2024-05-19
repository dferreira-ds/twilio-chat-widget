import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import ngrok from "ngrok";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

//middlewares
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

//routes
app.use("/api/v1/conversation", conversationRoute);
app.use("/api/v1/messages", messageRoute);

//post Flex message
app.post("/api/v1/messages/flexMessage", async(req, res) => {
    try {
        if (req.body.Source === "SDK") {
            io.emit("message", req.body);
        };
    }
    catch (err) {
        return res.status(500).json({ "error": err.message });
    };
    return res.status(200).json({ flexMessage: "success" });
});

io.on("connection", socket => {
    console.log("User connected");
    socket.on("message", (data) => {
        console.log(data);
    });
});

//error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    try {
        const url = await ngrok.connect({
            addr: PORT,
            subdomain: "dferreira",
            region: "us",
        });
    }
    catch (err) {
        console.log("ngrok error: ", err);
    };
});

