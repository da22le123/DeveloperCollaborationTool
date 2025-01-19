<script>
import router from "page";
import { SvelteFlowProvider } from "@xyflow/svelte";
import { onDestroy, onMount } from "svelte";
import { writable } from "svelte/store";
import { get, request } from "../utils/fetch.js";
import { applyAction } from "../lib/applyAction.js";
import { showPopupMessage } from "../stores/popupStore.js";
import { createSocket } from "../lib/socket.js";

import Editor from "../components/Editor.svelte";
import ExportButton from "../components/editor/ExportButton.svelte";
import ReplayHistory from "../components/editor/ReplayHistory.svelte";
import NodeList from "../components/editor/NodeList.svelte";
import EditorNodeProvider from "../providers/EditorNodeProvider.svelte";
import FlowDataModal from "../components/FlowDataModal.svelte";

export let params;

const sessionId = params.params.id;
let activeHistory = false;
let snapshot;
let showModal = false;

// True only after we receive the initial state from the server.
let isInitialized = false;

const nodes = writable([]);
const edges = writable([]);

const socket = createSocket();

// track session status to disable actions or able it
let isSessionOpened = true;

onMount(() => {
    // Listen for connection events
    socket.on("connect", () => {
        console.log("Connected to WebSocket server:", socket.id);
        // Emit the `join` event when the session loads
        socket.emit("join", { sessionId });
        console.log(`Connected via WebSocket. Joined session: ${sessionId}`);
    });

    socket.on("access_error", (data) => {
        const { message } = data;

        showPopupMessage(message || "Access error", "error", 15000);

        console.error("Access error:", message);
        router("/");
    });

    socket.on("new_action", async (action) => {
        const actionData = action.action_data;
        const newState = applyAction(
            { nodes: $nodes, edges: $edges },
            actionData,
        );
        nodes.set(newState.nodes);
        edges.set(newState.edges);
    });

    socket.on("session_was_closed", () => {
        isSessionOpened = false;
        const message =
            "The session has been closed. No further changes are allowed.";
        showPopupMessage(message, "info", 15000);
    });
    socket.on("session_was_opened", () => {
        isSessionOpened = true;
        const message =
            "The session has been opened. Changes are allowed again.";
        showPopupMessage(message, "info", 15000);
    });

    socket.on("session_status", (data) => {
        isSessionOpened = data.is_open;

        if (!isSessionOpened) {
            showPopupMessage(
                "The session is closed. No further edits are allowed.",
                "info",
                15000,
            );
        }
    });
});

// disconnect the socket
onDestroy(() => {
    socket.disconnect();
    console.log("Disconnected from WebSocket server.");
});

const onToggleHistory = () => {
    activeHistory = !activeHistory;
};

//saves the action on the history database
const createAction = async (data) => {
    if (!isSessionOpened) {
        showPopupMessage(
            "Editing is disabled as the session is closed.",
            "error",
            15000,
        );
        return;
    }
    await request("/actions", { session_id: sessionId, ...data });
};

const loadState = (sessionId) => {
    return get(`/sessions/${sessionId}/state`)
        .then((data) => {
            isInitialized = true;
            if (data.nodes) {
                nodes.set(data.nodes);
            }
            if (data.edges) {
                edges.set(data.edges);
            }
        })
        .catch((error) => {
            console.error("Failed to fetch session state:", error);
        });
};

$: {
    loadState(sessionId);
}

const redirectToInviteUsers = () => {
    router(`/sessions/${sessionId}/invitations`);
};

const showAction = (data) => {
    snapshot = data;
    showModal = true;
};

const closeModal = () => {
    showModal = false;
    snapshot = null;
};
</script>

<SvelteFlowProvider>
    <EditorNodeProvider>
        <div class="flex w-full">
            <div class="w-96 pr-10">
                <h1 class="text-2xl font-semibold mb-6">Session #{sessionId}</h1>

                <div class="flex justify-between mb-6">
                    <ExportButton sessionId={params.params.id}></ExportButton>

                    <a href={`/sessions/${sessionId}/invitations`} class="btn-primary px-9 rounded-md">
                        Invite Users
                    </a>
                </div>

                <NodeList />

                <div class="flex justify-between">
                    <a href={`/sessions/${sessionId}/statistics`} class="btn-primary px-7 rounded-md">
                        View Statistics
                    </a>

                    <button class="btn-primary px-7" on:click={onToggleHistory}>
                        {activeHistory ? 'Close History' : 'View History'}
                    </button>
                </div>
            </div>

            <div class="flex-auto border-black border-2">
                {#if isInitialized}
                    <Editor
                            on:createAction={(event) => createAction(event.detail)}
                            {isSessionOpened}
                            nodes={nodes}
                            edges={edges}
                            sessionId={params.params.id}
                            socket={socket}
                    />
                {/if}
            </div>
        </div>
    </EditorNodeProvider>
</SvelteFlowProvider>

{#if showModal}
    <FlowDataModal
            {snapshot}
            onClose={closeModal}
    />
{/if}

<ReplayHistory
        session_id={params.params.id}
        open={activeHistory}
        on:closed={onToggleHistory}
        on:showAction = {(event) => showAction(event.detail)}
        socket={socket}
/>
