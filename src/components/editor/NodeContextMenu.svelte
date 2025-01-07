<script>
import { createEventDispatcher } from "svelte";

import ContextMenu from "./ContextMenu.svelte";

const dispatch = createEventDispatcher();

export let node;
export let position;

// There are various problems with handling the data variables:
// 1. Turning the local variables into states with two-way binding on them breaks editing.
// 2. Using states to handle the input event manually causes an error.
// 3. Using local variables without the effect below does not load the correct node data
// when opening the context menu for a different node.
// 4. Replacing the input events with two-way binding breaks editing (same as 1).
//
// Therefore, even though the effect of watching changes in the context and manually
// handling input events does not look the prettiest, it is the only solution.
//
// There is still a minor issue with the color being retained when switching between
// nodes. However, any attempts to fix this causes one of the issues mentioned above.

let label;
let color;

$: {
    label = node?.data?.label;
    color = node?.data?.backgroundColor || "#FFFFFF";
}

$: {
    if (node) {
        dispatch("update", { label, color });
    }
}

const onDelete = () => dispatch("delete");
</script>

<ContextMenu position={position} hide={!node} on:delete={onDelete}>
    {#if node && "label" in node.data}
        <input type="text"
               class="block mb-2 w-full border border-gray-400"
               value={node.data.label}
               on:input={(event) => label = event.target.value} />
    {/if}

    {#if node}
        <input type="color"
               class="block w-full h-6"
               value={node.data.backgroundColor || "#FFFFFF"}
               on:input={(event) => color = event.target.value} />
    {/if}
</ContextMenu>
