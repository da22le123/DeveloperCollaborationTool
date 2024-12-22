<script>
import router from "page";
import { SvelteFlowProvider } from "@xyflow/svelte";
import { onDestroy, onMount } from "svelte";
import { request } from "../utils/fetch.js";
import {
    popupMessage,
    showPopup,
    showPopupMessage,
} from "../stores/popupStore.js";

import socket from "../lib/socket.js";

import Editor from "../components/Editor.svelte";
import ExportButton from "../components/editor/ExportButton.svelte";
import ReplayHistory from "../components/editor/ReplayHistory.svelte";
import NodeList from "../components/editor/NodeList.svelte";
import EditorNodeProvider from "../providers/EditorNodeProvider.svelte";

export let params;
const session_id = params.params.id;
let activeHistory = false;

onMount(() => {
    const sessionId = params?.params?.id;

    // Emit the `join` event when the session loads
    socket.emit("join", { sessionId });
    console.log(`Connected via WebSocket. Joined session: ${sessionId}`);

    // Listen for messages from the server
    socket.on("message", (data) => {
        console.log("Message from server:", data.message);
    });

    socket.on("access_error", (data) => {
        const { message } = data;

        showPopupMessage(message || "Access error", "error", 15000);

        console.error("Access error:", message);
        router("/");
    });
});

// Clean up listeners and disconnect the socket
onDestroy(() => {
    socket.off("access_error");
    socket.off("message");
    socket.disconnect();
    console.log("Disconnected from WebSocket server.");
});

const onToggleHistory = () => {
    activeHistory = !activeHistory;
};

//saves the action on the history database
const createAction = async (action_data) => {
    await request("/actions", { session_id, action_data });
};
</script>

<SvelteFlowProvider>
    <EditorNodeProvider>
        <div class="flex w-full">
            <div class="w-96 pr-10">
                <h1 class="text-2xl font-semibold mb-6">Session Name</h1>

                <div class="flex justify-between mb-6">
                    <ExportButton sessionId={params.params.id}></ExportButton>
                    <button class="btn-black px-9">Invite members</button>
                </div>

                <NodeList />

                <div class="flex justify-between">
                    <button class="btn-red px-4">Explore Statistics</button>
                    <button class="btn-black px-7" on:click={onToggleHistory}>
                        {activeHistory ? 'Close History' : 'View History'}
                    </button>
                    </div>
            </div>

            <div class="flex-auto border-black border-2">
                <Editor on:createAction={(event) => createAction(event.detail)} />
            </div>
        </div>
    </EditorNodeProvider>
</SvelteFlowProvider>

<ReplayHistory session_id={params.params.id} open={activeHistory} on:closed={onToggleHistory} />

<style>
    .btn-black {
        @apply bg-black text-white py-1.5  hover:border-black;
    }

    .btn-red {
        @apply bg-red-900 text-white py-1.5 hover:border-red-900;
    }
</style>
