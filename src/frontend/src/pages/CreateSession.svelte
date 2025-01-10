<script>
import { tokenStore } from "../stores/tokenStore.js";
import { isAdminStore } from "../stores/tokenStore.js";
import { isLeadStore } from "../stores/tokenStore.js";
import page from "page";
import { showPopupMessage } from "../stores/popupStore.js";
import { request } from "../utils/fetch.js";
import Field from "../components/Field.svelte";

let sessionName = "";

if (!$tokenStore || (!$isAdminStore && !$isLeadStore)) {
    page("/login");
}

async function createSession() {
    if (!sessionName) {
        showPopupMessage(
            "Session name is required. Please enter a session name ",
            "error",
            3000,
        );
        return;
    }

    try {
        const session = await request("/sessions", { name: sessionName });
        const { id } = session;

        showPopupMessage("Session created successfully!", "success", 3000);
        page(`/sessions/${id}`);
    } catch (error) {
        showPopupMessage(
            `Failed to create session: ${error.message}`,
            "error",
            3000,
        );
    }
}
</script>


<div class="flex flex-col items-center min-h-screen pt-16">
    <div class="w-full max-w-lg px-6 py-10 bg-white">
        <h1 class="text-2xl font-bold text-center mb-6">Create New Session</h1>
        <form on:submit|preventDefault={createSession} class="space-y-4">
            <div>
                <label for="sessionName" class="block text-sm font-medium text-gray-500 mb-2">Session Name</label>
                <Field
                        placeholder="Enter session name"
                        bind:value={sessionName}
                />
            </div>
            <div>
                <button
                        type="submit"
                        class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Create
                </button>
            </div>
        </form>
    </div>
</div>

