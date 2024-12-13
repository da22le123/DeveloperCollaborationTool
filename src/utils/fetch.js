import { tokenStore } from "../stores/tokenStore.js";
import { get as getStore } from "svelte/store";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Fetch data from the backend by sending a GET request.
 * @param {string} inputPath Path to request to (must be prefixed by a slash).
 * @param {Object|[string, string][]} queryParams Query parameters. Can be an object or a nested arrays of keys and values
 * (e.g., `[['key', 'value']]`). Values evaluated as false (e.g., `undefined`, `null`) result in the parameter being omitted.
 * @returns {Promise<any>} Parsed response data.
 * @throws Error Request failed.
 */
export async function get(inputPath, queryParams = []) {
    const token = getStore(tokenStore);

    let path = inputPath;
    let params = queryParams;

    if (Array.isArray(params)) {
        params = params.filter(([, value]) => !!value);
    } else if (typeof params === "object" && params !== null) {
        params = Object.fromEntries(
            Object.entries(params).filter(([, value]) => !!value),
        );
    }

    if (
        params !== null &&
        (!Array.isArray(params) || params.length > 0) &&
        (typeof params !== "object" || Object.keys(params).length > 0)
    ) {
        path += `?${new URLSearchParams(params).toString()}`;
    }

    const response = await fetch(API_BASE_URL + path, {
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        const message =
            response.bodyUsed &&
            response.getHeader("Content-Type") === "application/json"
                ? (await response.json()).message
                : "Failed to fetch resources.";

        throw new Error(message);
    }

    return response.json();
}

/**
 * Send a mutation query (POST, PATCH, ...) to the backend.
 * @param {string} path Path to send the request to (must be prefixed by a slash).
 * @param {Object} body Object body that is serialized to JSON.
 * @param {RequestMethod} method Request method.
 * @returns {Promise<any>} Parsed response data.
 * @throws Error Request failed.
 */
export async function request(path, body, method = "POST") {
    const token = getStore(tokenStore);

    const response = await fetch(API_BASE_URL + path, {
        method,
        body: JSON.stringify(body),
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const message =
            response.bodyUsed &&
            response.getHeader("Content-Type") === "application/json"
                ? (await response.json()).message
                : "Failed to modify resources.";

        throw new Error(message);
    }

    return response.json();
}

/**
 * @typedef {'POST'|'PUT'|'PATCH'|'DELETE'} RequestMethod
 */
