import { Server } from "socket.io";

let io; // WebSocket instance

// Function to initialize WebSocket server
export const initializeSocket = (server) => {
    io = new Server(server, {
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

    return io;
};

// Function to get the WebSocket instance
export const getSocket = () => {
    if (!io) {
        throw new Error(
            "Socket.io is not initialized. Please call initializeSocket first.",
        );
    }
    return io;
};
