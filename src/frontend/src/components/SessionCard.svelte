<script>
import { request } from "../utils/fetch.js";
import { showPopupMessage } from "../stores/popupStore.js";

export let title;
export let state;
export let id;

async function toggleSessionStatus() {
    try {
        const response = await request(`/sessions/${id}/status`, {}, "PATCH");
    } catch (error) {
        showPopupMessage(error.message, "error", 3000);
        return;
    }

    state = state === "Open" ? "Closed" : "Open";
    showPopupMessage("Session status updated successfully", "success", 3000);
}
</script>

<div class="m-10 p-10 rounded-md bg-gray-300 flex flex-col justify-between items-center text-center">
    <h1 class="mb-5 text-3xl truncate">{title}</h1>
    <p class="text-base mb-5">State: {state}</p>
    <button
            on:click={toggleSessionStatus}
            class="p-3 w-40 rounded text-white text-center transition duration-300 ease-in-out
        {state === 'Closed'
            ? 'bg-green-400 hover:bg-green-500'
            : 'bg-red-400 hover:bg-red-500'}"
    >
        {state === "Open" ? "Close" : "Open"}
    </button>
</div>