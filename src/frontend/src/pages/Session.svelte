<script>
import { SvelteFlowProvider } from "@xyflow/svelte";
import { onDestroy, onMount } from "svelte";

import socket from "../lib/socket.js";

import Editor from "../components/Editor.svelte";
import ReplayHistory from "../components/editor/ReplayHistory.svelte";
import NodeList from "../components/editor/NodeList.svelte";
import EditorNodeProvider from "../providers/EditorNodeProvider.svelte";
import { request } from "../utils/fetch.js";

export let params;
let activeHistory = false;

onMount(() => {
    const sessionId = params.sessionId; // Use session ID or default

    // Emit the `join` event when the session loads
    socket.emit("join", { sessionId });
    console.log(`Connected to WebSocket server. Joined session: ${sessionId}`);

    // Clean up the listener on destroy
    onDestroy(() => {
        socket.disconnect();
        console.log("Disconnected from WebSocket server.");
    });
});

const onToggleHistory = () => {
    activeHistory = !activeHistory;
};

//saves the action on the history database
const createAction = async (action_data) => {
    const session_id = params.params.id;
    await request("/actions", { session_id, action_data });
};
</script>

<SvelteFlowProvider>
    <EditorNodeProvider>
        <div class="flex w-full">
            <div class="w-96 pr-10">
                <h1 class="text-2xl font-semibold mb-6">Session Name</h1>

                <div class="flex justify-between mb-6">
                    <button class="btn-black px-7">Export</button>
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

<ReplayHistory open={activeHistory} on:closed={onToggleHistory} />

<style>
    .btn-black {
        @apply bg-black text-white py-1.5 hover:border-black;
    }

    .btn-red {
        @apply bg-red-900 text-white py-1.5 hover:border-red-900;
    }
</style>
