<script>
import { createEventDispatcher } from "svelte";

export let active = false;
export let date;
export let username;
export let type;
export let data;

const eventDispatcher = createEventDispatcher();

//dispatch the single action to parent
const onClick = () => eventDispatcher("showAction", data);

const getActionTypeText = (type) => {
    switch (type) {
        case "NODE_ADD":
            return "Node Added";
        case "NODE_UPDATE":
            return "Node Updated";
        case "NODE_DELETE":
            return "Node Deleted";
        case "EDGE_ADD":
            return "Edge Added";
        case "EDGE_UPDATE":
            return "Edge Updated";
        case "EDGE_DELETE":
            return "Edge Deleted";
    }
};
</script>

<div
        role="button"
        tabindex="0"
        class="flex items-center px-5 py-3 hover:bg-gray-200 transition-colors cursor-pointer"
        class:bg-gray-200={active}
        on:click={onClick}
        on:keypress={e => e.key === 'Enter' && onClick()}>
    <div class="flex-grow">
        <span class="block text-lg font-semibold text-gray-800">{getActionTypeText(type)} by {username}</span>
        <span class="block font-semibold leading-6 text-gray-600 mt-1">{date}</span>
    </div>
</div>
