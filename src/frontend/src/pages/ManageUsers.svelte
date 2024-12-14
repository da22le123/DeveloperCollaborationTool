<script>
import page from "page";
import { isAdminStore } from "../stores/tokenStore.js";
import { tokenStore } from "../stores/tokenStore";
import { popupDuration, popupMessage, showPopup } from "../stores/popupStore";

let users = [];
let message = "";
let type = "";
let isVisible = false;

if (!$tokenStore || !$isAdminStore) {
    page("/login");
}

async function fetchUsers() {
    const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${$tokenStore}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    users = await response.json();
}

function handleCheckboxChange(event, user) {
    const isChecked = event.target.checked;
    user.role = isChecked ? "Lead" : "Developer";
    changeUserIsLead(user.id, isChecked);
    users = [...users];
}

async function request(endpoint, body = {}, method = "GET") {
    const baseUrl = "http://localhost:3000"; // Base URL for the API
    const response = await fetch(`${baseUrl}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${$tokenStore}`,
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
    });

    // Check if the response is okay
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${errorData.message}`);
    }

    // Parse and return the response data
    return await response.json();
}

async function changeUserIsLead(userId, isLead) {
    try {
        const data = await request(`/users/${userId}`, { isLead }, "PATCH");
        showPopupMessage("User updated successfully", "success", 3000);
    } catch (error) {
        showPopupMessage("Failed to update user", "error", 3000);
    }
}

function showPopupMessage(message, type, timeout) {
    popupMessage.set({ message, type });
    showPopup.set(true);
    popupDuration.set(timeout);
}

const userPromise = fetchUsers();
</script>
<div class="flex flex-col items-center  min-h-screen py-10">
    <div class="w-full max-w-5xl mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mt-10 mb-10">Manage Users</h1>
    </div>
    <div class="w-full max-w-5xl bg-white  overflow-hidden ">
            {#if users.length > 0}
                <div class="w-full max-w-5xl mb-2">
                    <p class="text-lg  text-left font-bold text-gray-800">All Members</p>
                </div>
                <table class="table-auto w-full">
                    <thead class="border-b border-gray-300">
                    <tr>
                        <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Email</th>
                        <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Name</th>
                        <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Role</th>
                        <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Is Lead</th>
                        <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Delete User</th>
                    </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-300">
                    {#each users as user (user.id)}
                        <tr class="hover:bg-gray-100">
                            <td class="px-6 py-4 text-gray-800 text-left">{user.email}</td>
                            <td class="px-6 py-4 text-gray-800 text-left">{user.username}</td>
                            <td class="px-6 py-4 text-gray-800 text-left">{user.role}</td>
                            <td class="px-6 py-4 text-center">
                                <input
                                        type="checkbox"
                                        class="form-checkbox h-5 w-5 text-blue-600"
                                        checked={user.role === "Lead" || user.role === "Admin"}
                                        on:change={(event) => handleCheckboxChange(event, user)}
                                        disabled={user.role === "Admin"}
                                />
                            </td>
                        </tr>
                    {/each}
                    <tr>
                        <td colspan="5" class="border-t border-gray-300"></td>
                    </tr>
                    </tbody>
                </table>
            {:else}
                <div class="text-center text-neutral-400 font-bold py-10">No users found.</div>
            {/if}
    </div>
</div>

