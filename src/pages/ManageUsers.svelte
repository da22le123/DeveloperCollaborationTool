<script>
import { showPopupMessage } from "../stores/popupStore.js";
import { get, request } from "../utils/fetch.js";

let users = [];
let isModalOpen = false;
let editingUser = null;
let newEmail = "";

async function fetchUsers() {
    users = await get("/users");
    return users;
}

function handleCheckboxChange(event, user) {
    const isChecked = event.target.checked;
    return changeUserIsLead(user, isChecked);
}

async function changeUserIsLead(user, isLead) {
    try {
        const data = await request(`/users/${user.id}`, { isLead }, "PATCH");

        user.role = data.is_lead ? "Lead" : "Developer";
        users = [...users];

        showPopupMessage("User updated successfully", "success", 3000);
    } catch (error) {
        showPopupMessage("Failed to update user", "error", 3000);
    }
}

function openEditEmailModal(user) {
    editingUser = user;
    newEmail = user.email;
    isModalOpen = true;
}

async function saveEmailChange() {
    try {
        await request(`/users/${editingUser.id}`, { email: newEmail }, "PATCH");
        showPopupMessage("Email updated successfully", "success", 3000);
        editingUser.email = newEmail;
        users = [...users];
        closeModal();
    } catch (error) {
        showPopupMessage(
            `Failed to update email: ${error.message}`,
            "error",
            3000,
        );
    }
}

async function deleteUser(user) {
    try {
        await request(`/users/${user.id}`, {}, "DELETE");
        users = users.filter((u) => u.id !== user.id);
        showPopupMessage("User deleted successfully", "success", 3000);
    } catch (error) {
        showPopupMessage(
            `Failed to delete user: ${error.message}`,
            "error",
            3000,
        );
    }
}

function confirmAndDeleteUser(user) {
    const isConfirmed = confirm(
        `Are you sure you want to delete ${user.username}?`,
    );
    if (isConfirmed) {
        deleteUser(user);
    }
}

function closeModal() {
    isModalOpen = false;
    editingUser = null;
    newEmail = "";
}

const userPromise = fetchUsers();
</script>

<div class="flex flex-col items-center  min-h-screen py-10">
    <div class="w-full max-w-5xl mb-6">
        <h1 class="text-2xl font-bold text-gray-800 mt-10 mb-10">Manage Users</h1>
    </div>

    <div class="w-full max-w-5xl bg-white  overflow-hidden ">
        {#await userPromise}
            <div class="text-center text-neutral-400 font-bold py-10">Loading users...</div>
        {:then response}
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
                        <th class="px-6 py-3 text-center text-stone-400 font-normal tracking-wider">Change Email</th>
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
                                        checked={user.is_lead || user.is_admin}
                                        on:change={(event) => handleCheckboxChange(event, user)}
                                        disabled={user.is_admin}
                                />
                            </td>
                            <td class="px-6 py-4 text-center">
                                {#if !user.is_admin}
                                <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        on:click={() => confirmAndDeleteUser(user)}>Delete</button>
                                {/if}
                            </td>
                            <td class="px-6 py-4 text-center">
                                {#if !user.is_admin}
                                    <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            on:click={() => openEditEmailModal(user)}>Change Email</button>
                                {/if}
                            </td>
                        </tr>
                    {/each}
                    <tr>
                        <td colspan="5" class="border-t border-gray-300"></td>
                    </tr>
                </tbody>
            </table>
        {/await}
    </div>

    {#if isModalOpen}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Edit Email</h2>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">New Email:</label>
                    <input
                            type="email"
                            bind:value={newEmail}
                            class="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div class="flex justify-end space-x-4">
                    <button
                            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            on:click={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            on:click={saveEmailChange}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

