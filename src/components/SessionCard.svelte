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

<div class="p-4 rounded-md border border-gray-300 shadow-lg flex flex-col justify-between items-center text-center gap-2">
    <h1 class="text-3xl truncate">{title} [{id}]</h1>
    <p class="text-base">State: {state}</p>
    <button
            on:click={toggleSessionStatus}
            class="py-3 px-6 rounded text-white text-center transition self-stretch
        {state === 'Closed'
            ? 'bg-green-400 hover:bg-green-500'
            : 'bg-red-400 hover:bg-red-500'}"
    >
        {state === "Open" ? "Close" : "Open"}
    </button>
    <a
            href={`/sessions/${id}`}
            class="py-3 px-6 rounded text-white text-center transition bg-slate-800 self-stretch"
    >
        View
    </a>
</div>