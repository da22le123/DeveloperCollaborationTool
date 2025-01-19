<script>
import Field from "../components/Field.svelte";
import { showPopupMessage } from "../stores/popupStore.js";
import { request } from "../utils/fetch.js";
import page from "page";
import { idStore } from "../stores/tokenStore.js";
import { get } from "svelte/store";

let currentPassword = "";
let newPassword = "";

async function handleChangePassword() {
    try {
        await request(
            `/users/${get(idStore)}/password`,
            { currentPassword, newPassword },
            "PUT",
        );

        showPopupMessage("Password changed successfully", "success", 3000);
        page("/");
    } catch (error) {
        showPopupMessage(
            `Failed to change password: ${error.message}`,
            "error",
            3000,
        );
    }
}
</script>

<div class="flex flex-col items-center min-h-screen pt-16">
    <div class="w-full max-w-lg px-6 py-10 bg-white">
        <h1 class="text-2xl font-bold text-center mb-6">Change Your Password</h1>
        <form on:submit|preventDefault={handleChangePassword} class="flex flex-col space-y-4">
            <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-500 mb-2">Current Password</label>
                <Field
                    placeholder="Enter current password"
                    bind:value={currentPassword}
                    required={true}
                />
            </div>
            <div>
                <label for="newPassword" class="block text-sm font-medium text-gray-500 mb-2">New Password</label>
                <Field
                    placeholder="Enter new password"
                    bind:value={newPassword}
                    required={true}
                />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">Change</button>
        </form>
    </div>
</div>