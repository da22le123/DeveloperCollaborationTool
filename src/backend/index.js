import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { Server } from "socket.io"; // Import Socket.IO
import http from "node:http";
import { sessionsRouter } from "./routes/session.js";
import { usersRouter } from "./routes/users.js";
import { authRouter } from "./routes/auth.js";
import { actionsRouter } from "./routes/actions.js";
import { connectToDatabase } from "./database/database.js";

const app = express();

app.use(express.json());
app.use(cors());

const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: "Validation error",
            errors: err.errors,
        });
    }
    res.status(500).json({ error: "Something went wrong!" });
};

app.use("/users", usersRouter);
app.use("/tokens", authRouter);
app.use("/sessions", sessionsRouter);
app.use("/actions", actionsRouter);
app.use(errorHandler);

// HTTP server creation
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173", // Frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    },
});

io.on("connect", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", ({ sessionId }) => {
        socket.join(sessionId);
        console.log(`User ${socket.id} joined session: ${sessionId}`);


    });


    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


void (async () => {
    await connectToDatabase();
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
})();
