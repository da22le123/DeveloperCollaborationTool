<script>
import { createEventDispatcher } from "svelte";

export let active = false;
export let date;
export let username;
export let data;

const eventDispatcher = createEventDispatcher();

//dispatch the single action to parent
const onClick = () => eventDispatcher("showAction", data);
</script>

<div
        role="button"
        tabindex="0"
        class="flex items-center px-5 py-3 hover:bg-gray-200 transition-colors cursor-pointer"
        class:bg-gray-200={active}
        on:click={onClick}
        on:keypress={e => e.key === 'Enter' && onClick()}>
    <div class="flex-grow">
        <span class="block font-semibold leading-6">{date}</span>
        <span class="block text-sm text-gray-500">{username}</span>
    </div>
</div>
