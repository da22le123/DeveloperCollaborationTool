import {parseJwt} from "./parser.js";
import {writable, derived} from "svelte/store";

const storedToken = localStorage.getItem("token");

export const tokenStore = writable(storedToken);

export const userStore = derived(tokenStore, (token) => (token ? parseJwt(token) : null));

export const userEmail = derived(tokenStore, (token) => token ? parseJwt(token).email : null)

export const isAdminStore = derived (userStore, (user) => {
    return user && user.isAdmin;
});

export const isLeadStore = derived (userStore, (user) => {
    return user && user.isLead;
})


export function setToken(token) {
    localStorage.setItem("token", token);
    tokenStore.set(token);
}

export function clearToken() {
    localStorage.removeItem("token");
    tokenStore.set(null);
}