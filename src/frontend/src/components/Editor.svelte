<script>
import { Background, SvelteFlow, useSvelteFlow } from "@xyflow/svelte";
import { writable } from "svelte/store";
import { getContext } from "svelte";
import { createEventDispatcher } from "svelte";

import "@xyflow/svelte/dist/style.css";

const { screenToFlowPosition } = useSvelteFlow();
const newNode = getContext("newNode");
const dispatch = createEventDispatcher();

export let initialNodes = [
    {
        id: "1",
        data: { label: "Node 1" },
        position: { x: 0, y: 0 },
    },
    {
        id: "2",
        data: { label: "Node 2" },
        position: { x: 0, y: 100 },
    },
];

export let initialEdges = [
    {
        id: "1-2",
        type: "default",
        source: "1",
        target: "2",
        label: "Edge",
    },
];

const nodes = writable(initialNodes);
const edges = writable(initialEdges);

const onDragOver = (event) => {
    event.preventDefault();

    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
    }
};

const onDrop = (event) => {
    event.preventDefault();

    if (!$newNode) {
        return;
    }

    const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
    });

    const node = {
        id: `${Math.random()}`,
        position,
        origin: [0.5, 0.0],
        ...$newNode,
    };

    $nodes.push(node);
    $nodes = [...$nodes];

    dispatch("createAction", { state: $nodes }); //dispatch event to Session
};
</script>

<div class="w-full h-full editor-wrapper">
    <SvelteFlow {nodes} {edges} snapGrid={[25, 25]} fitView proOptions={{ hideAttribution: true }} on:dragover={onDragOver} on:drop={onDrop}>
        <Background />
    </SvelteFlow>
</div>

<style>
    .editor-wrapper {
        min-height: 45rem;
    }
</style>
