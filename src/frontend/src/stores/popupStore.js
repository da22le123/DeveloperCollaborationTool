import { writable } from "svelte/store";

export const popupMessage = writable({ message: " ", type: " " });
export const showPopup = writable(false);
export const popupDuration = writable(3000);
