<script>
import { Background, SvelteFlow, useSvelteFlow } from "@xyflow/svelte";
import { writable } from "svelte/store";
import { createEventDispatcher, getContext } from "svelte";

import NodeContextMenu from "./editor/NodeContextMenu.svelte";
import EdgeContextMenu from "./editor/EdgeContextMenu.svelte";

import "@xyflow/svelte/dist/style.css";

const { screenToFlowPosition, viewport } = useSvelteFlow();
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

    dispatch("createAction", { state: $nodes });
};

let selectedNode;
let selectedEdge;
let clickedPosition = { x: 0, y: 0 };

const cancelContextMenus = () => {
    selectedNode = null;
    selectedEdge = null;
};

const onNodeContextMenu = ({ detail: { event, node } }) => {
    event.preventDefault();

    selectedNode = node;
    selectedEdge = null;

    clickedPosition = {
        x: event.clientX,
        y: event.clientY + 10,
    };
};

const onEdgeContextMenu = ({ detail: { event, edge } }) => {
    event.preventDefault();

    selectedNode = null;
    selectedEdge = edge;

    clickedPosition = {
        x: event.clientX,
        y: event.clientY + 10,
    };
};

const onPaneClick = () => cancelContextMenus();
const onNodeDrag = () => cancelContextMenus();

let lastZoom = $viewport.zoom;

// Cancel context menus when the zoom level changes.
$: {
    if ($viewport.zoom !== lastZoom) {
        cancelContextMenus();
        lastZoom = $viewport.zoom;
    }
}

const onKeyDown = (event) => {
    if (event.key === "Escape") {
        cancelContextMenus();
    }
};
</script>

<div class="w-full h-full editor-wrapper">
    <SvelteFlow {nodes} {edges} fitView
                snapGrid={[25, 25]}
                proOptions={{ hideAttribution: true }}
                on:dragover={onDragOver}
                on:drop={onDrop}
                on:nodecontextmenu={onNodeContextMenu}
                on:edgecontextmenu={onEdgeContextMenu}
                on:paneclick={onPaneClick}
                on:nodedrag={onNodeDrag}
    >
        <Background />

        <NodeContextMenu position={clickedPosition} node={selectedNode} />
        <EdgeContextMenu position={clickedPosition} edge={selectedEdge} />
    </SvelteFlow>
</div>

<svelte:window on:keydown={onKeyDown} />

<style>
    .editor-wrapper {
        min-height: 45rem;
    }
</style>
