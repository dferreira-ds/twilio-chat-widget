import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import messageRoute from "./routes/messageRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { Server as SocketServer } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);

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

//error middleware
app.use(errorHandler);

const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", socket => {
    console.log("User connected");
    socket.on("message", (data) => {
        console.log(data);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

