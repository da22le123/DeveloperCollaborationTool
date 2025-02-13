import { writable } from "svelte/store";

export const popupMessage = writable({ message: " ", type: " " });
export const showPopup = writable(false);
export const popupDuration = writable(3000);
export function showPopupMessage(message, type, timeout) {
    popupMessage.set({ message, type });
    showPopup.set(true);
    popupDuration.set(timeout);
}
