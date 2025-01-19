import { get } from "svelte/store";
import { isAdminStore, isLeadStore } from "../stores/tokenStore.js";

export function getUserRole() {
    return get(isAdminStore)
        ? "\u{1F451}"
        : get(isLeadStore)
          ? "Leader"
          : "Developer";
}
