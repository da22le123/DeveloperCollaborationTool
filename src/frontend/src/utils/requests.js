import { idStore, tokenStore } from "../stores/tokenStore.js";
import { get } from "svelte/store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginRequest = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/tokens`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
    }

    return res.json();
};

export const availableSessionsRequest = async () => {
    const res = await fetch(`${API_BASE_URL}/users/sessions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${get(tokenStore)}`,
        },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch available sessions.");
    }

    return res.json();
};
