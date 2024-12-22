<script>
import HistoryEntry from "./HistoryEntry.svelte";
import { createEventDispatcher } from "svelte";
import { get } from "../../utils/fetch.js"; // Named import

const eventDispatcher = createEventDispatcher();

export let open = false;
export let session_id;

let historyPromise;

// Whenever `session_id` changes, trigger the fetch
$: if (session_id) {
    historyPromise = get(`/actions/${session_id}`, { session_id }); // Fetch the history
}

const onCloseClick = () => eventDispatcher("closed");
</script>

<div class="replay-history fixed right-0 top-0 w-80 h-full py-7 bg-gray-100 transition-all z-10" class:closed={!open}>
    <div class="absolute top-2 right-1 px-5 text-xl font-bold cursor-pointer" on:click={onCloseClick}>&#x2715;</div>

    <h2 class="text-2xl px-5 font-medium mb-9">Replay History</h2>
    {#await historyPromise}
        <h2>Loading History</h2>
    {:then historyEntry}
        {#each historyEntry as entry}
            <HistoryEntry date={new Date(entry.creation_date).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}  username={entry.User.username} active={false}/>
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
