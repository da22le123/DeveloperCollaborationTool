import { io } from "socket.io-client";
import { tokenStore } from "../stores/tokenStore.js";
import { showPopupMessage } from "../stores/popupStore.js";
import { get } from "svelte/store";

export const createSocket = () => {
    // Retrieve the stored token
    const token = get(tokenStore);

    // Initialization of the WebSocket connection with the authentication token
    const socket = io("http://localhost:3000", {
        auth: {
            token: token, // Pass JWT token for authentication
        },
    });

    // Handle regular messages (info notifications)
    socket.on("message", (data) => {
        const { message } = data;

        showPopupMessage(message || "New notification", "info", 5000);
    });

    // Handle errors separately
    socket.on("error", (data) => {
        const { message } = data;

        showPopupMessage(message || "Error occurred", "info", 5000);
    });

    return socket;
};
