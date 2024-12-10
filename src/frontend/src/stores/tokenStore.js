import { parseJwt } from "./parser.js";
import { writable, derived } from "svelte/store";

const storedToken = localStorage.getItem("token");

export const tokenStore = writable(storedToken);

tokenStore.subscribe((token) => {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token");
    }
});

export const userStore = derived(tokenStore, (token) =>
    token ? parseJwt(token) : null,
);

export const idStore = derived(tokenStore, (token) =>
    token ? parseJwt(token).id : null,
);

export const usernameStore = derived(tokenStore, (token) =>
    token ? parseJwt(token).username : null,
);

export const isAdminStore = derived(userStore, (user) => user?.isAdmin);

export const isLeadStore = derived(userStore, (user) => user?.isLead);

export function setToken(token) {
    tokenStore.set(token);
}

export function clearToken() {
    tokenStore.set(null);
}
