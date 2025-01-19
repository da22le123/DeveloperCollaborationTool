<script>
import { getContext } from "svelte";

const nodeContext = getContext("newNode");

const nodes = [
    {
        type: "default",
        data: { label: "Text" },
        text: "Text",
    },
];

const onDragStart = (event, node) => {
    if (!event.dataTransfer) {
        return null;
    }

    nodeContext.set({ ...node, text: undefined });

    event.dataTransfer.effectAllowed = "move";
};
</script>

<div class="w-full py-3 px-4 bg-gray-100 flex items-start mb-6">
    {#each nodes as node (node.type)}
        <div class="border-black border-2 px-3 py-1 rounded cursor-move"
             on:dragstart={(event) => onDragStart(event, node)}
             draggable="true"
             role="application"
        >{node.text}</div>
    {/each}
</div>
