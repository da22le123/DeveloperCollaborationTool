<script>
import HistoryEntry from "./HistoryEntry.svelte";
import { createEventDispatcher, onMount } from "svelte";
import { get } from "../../utils/fetch.js";

const eventDispatcher = createEventDispatcher();

export let open = false;
export let session_id;
export let socket;

let historyPromise;

// Whenever `session_id` changes, trigger the fetch
$: if (session_id) {
    historyPromise = get(`/actions/${session_id}`, { session_id }); // Fetch the history
}

onMount(() => {
    const handler = async (action) => {
        if (action.session_id === Number(session_id)) {
            historyPromise = get(`/actions/${session_id}`, { session_id });
        }
    };

    socket.on("new_action", handler);
    return () => {
        socket.off("new_action", handler);
    };
});

const onCloseClick = () => eventDispatcher("closed");
const handleAction = (data) => eventDispatcher("showAction", data);
</script>

<div class="replay-history fixed right-0 top-0 w-80 h-full bg-gray-100 transition-all z-10 overflow-y-auto no-scrollbar" class:closed={!open}>
    <div class="sticky top-0 z-10 bg-gray-100 py-3">
        <div class="absolute top-2 right-1 px-5 text-xl font-bold cursor-pointer" on:click={onCloseClick}>&#x2715;</div>

        <h2 class="text-2xl px-5 font-medium mb-9">Replay History</h2>
    </div>
    {#await historyPromise}
        <h2>Loading History</h2>
    {:then historyEntry}
        {#each historyEntry.reverse() as entry}
            <HistoryEntry date={new Date(entry.creation_date).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}  username={entry.User.username} active={false} data={entry.state} on:showAction={(event) => handleAction(event.detail)}/>
        {/each}
    {:catch error}
        <p>An error occurred</p>
    {/await}
</div>

<style>
    .replay-history {
        --width: 20rem;
        width: var(--width);

        &:not(.closed) {
            right: 0;
        }

        &.closed {
            right: calc(var(--width) * -1);
        }
    }
</style>