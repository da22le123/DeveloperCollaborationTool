import { writable } from "svelte/store";
import { io } from "socket.io-client";

//WebSocket connection initialization
const socket = io("http://localhost:3000");

// Listen for connection events
socket.on("connect", () => {
    console.log("Connected to WebSocket server:", socket.id);
});

socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
});


export const socketStore = writable(socket);
