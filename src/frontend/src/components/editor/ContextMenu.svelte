<script>
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();

export let position;
export let hide = false;

const onDeleteClick = () => dispatch("delete");
</script>

<div style="top: {position.y}px; left: {position.x}px" class="fixed bg-white border-black border-2 rounded py-2 px-3 context-menu" class:hidden={hide}>
    <slot />

    <button class="bg-red-900 text-white py-0.5 hover:bg-red-700 hover:border-red-900 transition-colors w-full text-center mt-3" on:click={onDeleteClick}>Delete</button>
</div>

<style>
    .context-menu {
        z-index: 1000;
    }
</style>
