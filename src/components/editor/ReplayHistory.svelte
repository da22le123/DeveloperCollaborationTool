<script>
import { createEventDispatcher } from 'svelte';

import HistoryEntry from './HistoryEntry.svelte';

const eventDispatcher = createEventDispatcher();

export let open = false;

const onCloseClick = () => eventDispatcher("closed");
</script>

<div class="replay-history fixed right-0 top-0 w-80 h-full py-7 bg-gray-100 transition-all" class:closed={!open}>
    <div class="absolute top-2 right-1 px-5 text-xl font-bold cursor-pointer" on:click={onCloseClick}>&#x2715;</div>

    <h2 class="text-2xl px-5 font-medium mb-9">Replay History</h2>

    <HistoryEntry active={false} />
    <HistoryEntry active={true} />
    <HistoryEntry active={false} />
    <HistoryEntry active={false} />
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
