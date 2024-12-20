import jwt from "jsonwebtoken";

// JWT Authentication Middleware for Socket.IO
export const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error("Authentication token is missing"));
    }

    try {
        socket.user = jwt.verify(token, process.env.JWT_SECRET); // Attach user data to socket
        next();
    } catch (error) {
        return next(new Error("Invalid authentication token"));
    }
};
