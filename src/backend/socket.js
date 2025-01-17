import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middlewares/socketAuthMiddleware.js";
import { Action, Session, SessionMember } from "./database/database.js";

let io; // WebSocket instance
const socketsList = []; // List of connected sockets

// Function to initialize WebSocket server
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || "http://localhost:5173", // Frontend URL
            methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        },
    });

    io.use(socketAuthMiddleware);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        socketsList.push(socket); // Add socket to the list

        // Handling of session joining
        socket.on("join", async ({ sessionId }) => {
            try {
                const session = await Session.findOne({
                    where: { id: sessionId },
                });
                if (!session) {
                    return socket.emit("access_error", {
                        message: "Session not found",
                    });
                }

                const isMember = await SessionMember.findOne({
                    where: { session_id: sessionId, user_id: socket.user.id },
                });
                if (!isMember && !socket.user.isAdmin) {
                    return socket.emit("access_error", {
                        message: "Access denied",
                    });
                }

                socket.join(sessionId);

                console.log(
                    `User ${socket.user.username} joined room: ${sessionId}`,
                );
                socket.emit("session_status", { is_open: session.is_open });

                // use of utility function to notify other members that the user joined a session
                sendMessageToSession(
                    sessionId,
                    "message",
                    {
                        message: `User ${socket.user.username} joined the session.`,
                    },
                    socket,
                );
            } catch (error) {
                console.error("Error joining room:", error);
                socket.emit("error", { message: "Failed to join room" });
            }
        });

        socket.on("disconnect", () => {
            const index = socketsList.indexOf(socket);
            if (index !== -1) {
                socketsList.splice(index, 1); // Remove from the list
            }

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

/**
 * Find a socket by user ID.
 * @param {string} userId - The ID of the user to find.
 * @returns {object|null} The socket object or null if not found.
 */
export const findSocketByUserId = (userId) => {
    for (const socket of socketsList) {
        if (socket.user?.id === userId) {
            return socket;
        }
    }
    return null; // Return null if no matching socket is found
};

/**
 * Utility function to broadcast messages.
 * @param {string} sessionId - ID of the session(room).
 * @param {string} messageType - Type of the message to handle it on frontend.
 * @param {object} message - The message payload, use of an object for this parameter for future scalability
 * @param {object|null} exceptSocket - The socket to exclude (optional).
 */
export const sendMessageToSession = (
    sessionId,
    messageType,
    message,
    exceptSocket = null,
) => {
    let session = sessionId;

    if (typeof sessionId === "number") {
        session = sessionId.toString();
    }

    for (const socket of socketsList) {
        // Check if the socket is in the room and is not the excluded socket
        if (socket.rooms?.has(session) && socket !== exceptSocket) {
            socket.emit(messageType, message);
        }
    }
};
