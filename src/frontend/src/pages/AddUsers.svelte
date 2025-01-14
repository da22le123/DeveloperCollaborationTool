<script>
import page from "page";
import { isAdminStore } from "../stores/tokenStore.js";
import { tokenStore } from "../stores/tokenStore";
import { showPopupMessage } from "../stores/popupStore";
import { request } from "../utils/fetch.js";

export let params;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

let users = [];
let message = "";
let type = "";
let isVisible = false;

let session_id = params?.params?.id;

if (!$tokenStore || !$isAdminStore) {
    page("/login");
}

async function fetchUsersAndInviteStatuses() {
    const response = await fetch(`${baseUrl}/sessions/${session_id}/users`, {
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

async function inviteUser(userId) {
    try {
        const response = await request(`/sessions/${session_id}/members`, {
            user_id: userId,
        });
        // Update the local `users` array to reflect the new state
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
            users[userIndex].isMember = true;
        }
        showPopupMessage("User invited successfully", "success", 3000);
    } catch (error) {
        showPopupMessage("Failed to invite user", "error", 3000);
    }
}

const userPromise = fetchUsersAndInviteStatuses();
</script>
<div class="flex flex-col items-center  min-h-screen py-10">
    <div class="w-full max-w-5xl mb-6 text-center">
        <h1 class="text-2xl font-bold text-gray-800 mt-10 mb-10">Bring your team on board</h1>
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
                    <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Status</th>
                </tr>
                </thead>

                <tbody class="divide-y divide-gray-300">
                {#each users as user (user.id)}
                    <tr class="hover:bg-gray-100">
                        <td class="px-6 py-4 text-gray-800 text-center">{user.email}</td>
                        <td class="px-6 py-4 text-gray-800 text-center">{user.username}</td>
                        <td class="px-6 py-4 text-gray-800 text-center">{user.role}</td>
                        <td class="px-6 py-4 text-center">
                            {#if user.isMember}
                                <span class="text-red-500 font-semibold">Invited</span>
                            {:else}
                                <button
                                        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        on:click={() => inviteUser(user.id)}
                                >
                                    Invite
                                </button>
                            {/if}
                        </td>
                    </tr>
                {/each}
                <tr>
                    <td colspan="4" class="border-t border-gray-300"></td>
                </tr>
                </tbody>
            </table>
        {:else}
            <div class="text-center text-neutral-400 font-bold py-10">No users found.</div>
        {/if}
    </div>
</div>

