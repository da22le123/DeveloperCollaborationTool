<script>
import { Background, SvelteFlow, useSvelteFlow } from "@xyflow/svelte";
import { createEventDispatcher, getContext } from "svelte";
import { createDebounceWithMap } from "../lib/debounce.js";
import { getBrightness } from "../lib/colors.js";
import { get, writable } from "svelte/store";

import NodeContextMenu from "./editor/NodeContextMenu.svelte";
import EdgeContextMenu from "./editor/EdgeContextMenu.svelte";

import "@xyflow/svelte/dist/style.css";
import Cursor from "./Cursor.svelte";
import { idStore } from "../stores/tokenStore.js";
import { throttle } from "../lib/throttle.js";

export let nodes;
export let edges;
export let sessionId;
export let socket;

const {
    screenToFlowPosition,
    toObject,
    viewport,
    updateNode,
    updateNodeData,
    deleteElements,
    getNode,
} = useSvelteFlow();

const newNode = getContext("newNode");
const dispatch = createEventDispatcher();

socket.on("cursors", (data) => {
    const filteredData = data.filter((c) => c.id !== get(idStore));
    lastCursors = filteredData;
    updateCursors(filteredData);
});

export let isSessionOpened = true; // property to control the interactivity of editor

const dispatchAction = (action) => {
    dispatch("createAction", { action_data: action });
};

const nodesDebounce = createDebounceWithMap();
const edgesDebounce = createDebounceWithMap();

const debounceNodeUpdate = (id, data) => {
    nodesDebounce(
        id,
        (nodeData) => {
            dispatchAction({
                type: "NODE_UPDATE",
                data: nodeData,
            });
        },
        data,
        1000,
    );
};

const debounceEdgeUpdate = (id, data) => {
    edgesDebounce(
        id,
        (edgeData) => {
            dispatchAction({
                type: "EDGE_UPDATE",
                data: edgeData,
            });
        },
        data,
        1000,
    );
};

const onDelete = ({ nodes, edges }) => {
    if (nodes.length > 0) {
        for (const node of nodes) {
            dispatchAction({
                type: "NODE_DELETE",
                data: node,
            });
        }
    }
    if (edges.length > 0) {
        for (const edge of edges) {
            dispatchAction({
                type: "EDGE_DELETE",
                data: edge,
            });
        }
    }
};

const cursors = writable([]);

let lastCursorX;
let lastCursorY;

// Throttle the mousemove event to 15 FPS
const throttledOnMouseMove = throttle(onMouseMove, 1000 / 15);

function onMouseMove(event) {
    const onFlowPosition = screenToFlowPosition(
        {
            x: event.clientX,
            y: event.clientY,
        },
        {
            snapToGrid: false,
        },
    );

    if (lastCursorX !== onFlowPosition.x || lastCursorY !== onFlowPosition.y) {
        lastCursorX = onFlowPosition.x;
        lastCursorY = onFlowPosition.y;
        socket.emit("cursor", {
            id: get(idStore),
            sessionId: sessionId,
            x: lastCursorX,
            y: lastCursorY,
        });
    }
}

let lastCursors;

function updateCursors(cursorsData) {
    if (!cursorsData) {
        return;
    }

    let { viewport } = toObject();
    viewport.x = viewport.x / -viewport.zoom;
    viewport.y = viewport.y / -viewport.zoom;

    const cursorsLatest = cursorsData.map((c) => {
        return {
            ...c,
            x: (c.x - viewport.x) * viewport.zoom,
            y: (c.y - viewport.y) * viewport.zoom,
        };
    });

    cursors.set(cursorsLatest);
}

const onDragOver = (event) => {
    if (!isSessionOpened) return;
    event.preventDefault();

    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move";
    }
};

const onDrop = (event) => {
    if (!isSessionOpened) return;
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

    dispatchAction({
        type: "NODE_ADD",
        data: node,
    });
};

let selectedNode;
let selectedEdge;
let clickedPosition = { x: 0, y: 0 };

const onUpdateNode = ({ detail: { label, color } }) => {
    if (!isSessionOpened) return;

    updateNodeData(selectedNode.id, { label, backgroundColor: color });

    const brightness = getBrightness(color);
    const textColor = brightness > 160 ? "#000" : "#fff";

    updateNode(selectedNode.id, {
        style: `background-color: ${color}; color: ${textColor}`,
    });

    debounceNodeUpdate(selectedNode.id, getNode(selectedNode.id));
};

const onDeleteNode = () => {
    if (!isSessionOpened) return;
    deleteElements({ nodes: [selectedNode] });
    $nodes = $nodes.filter((node) => node.id !== selectedNode.id);

    dispatchAction({
        type: "NODE_DELETE",
        data: selectedNode,
    });
    cancelContextMenus();
};

const onUpdateEdge = ({ detail: { label, type, markerStart, markerEnd } }) => {
    if (!isSessionOpened) return;
    // To update the edge object, the entire collection has to be re-assigned.
    $edges = $edges.map((entry) => {
        // Retain the edge's properties if we are not modifying this edge.
        if (entry.id !== selectedEdge.id) {
            return entry;
        }

        const newEdge = { ...entry, label, type };

        if (markerStart !== -1) {
            newEdge.markerStart = { type: markerStart };
        }

        if (markerEnd !== -1) {
            newEdge.markerEnd = { type: markerEnd };
        }

        debounceEdgeUpdate(newEdge.id, newEdge);

        return newEdge;
    });
};

const onDeleteEdge = () => {
    if (!isSessionOpened) return;
    deleteElements({ edges: [selectedEdge] });
    dispatchAction({
        type: "EDGE_DELETE",
        data: selectedEdge,
    });
    cancelContextMenus();
};

const cancelContextMenus = () => {
    selectedNode = null;
    selectedEdge = null;
};

const onNodeContextMenu = ({ detail: { event, node } }) => {
    if (!isSessionOpened) return;
    event.preventDefault();

    selectedNode = node;
    selectedEdge = null;

    clickedPosition = {
        x: event.clientX,
        y: event.clientY + 10,
    };
};

const onEdgeContextMenu = ({ detail: { event, edge } }) => {
    if (!isSessionOpened) return;
    event.preventDefault();

    selectedNode = null;
    selectedEdge = edge;

    clickedPosition = {
        x: event.clientX,
        y: event.clientY + 10,
    };
};

const onPaneClick = () => cancelContextMenus();

const onNodeDragStop = ({ detail: { targetNode } }) => {
    if (!isSessionOpened) return;
    dispatchAction({
        type: "NODE_UPDATE",
        data: getNode(targetNode.id),
    });
};

const onEdgeCreate = (connection) => {
    if (!isSessionOpened) return;
    const edge = {
        id: `${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        type: "bezier",
    };
    dispatchAction({
        type: "EDGE_ADD",
        data: edge,
    });
    return edge;
};

const onNodeDrag = (e) => {
    throttledOnMouseMove(e.detail.event);
};

let lastZoom = $viewport.zoom;
let lastX = $viewport.x;
let lastY = $viewport.y;

// Cancel context menus and redraw cursors when the zoom level changes.
$: {
    if ($viewport.zoom !== lastZoom) {
        cancelContextMenus();
        updateCursors(lastCursors);
        lastZoom = $viewport.zoom;
    }

    if ($viewport.x !== lastX || $viewport.y !== lastY) {
        cancelContextMenus();
        updateCursors(lastCursors);
        lastX = $viewport.x;
        lastY = $viewport.y;
    }
}

const onKeyDown = (event) => {
    if (event.key === "Escape" || event.key === "Enter") {
        cancelContextMenus();
    }
};
</script>

<div class="w-full h-full editor-wrapper">
    {#if edges && nodes}
        <SvelteFlow {nodes} {edges} fitView
                    snapGrid={[25, 25]}
                    proOptions={{ hideAttribution: true }}
                    nodesDraggable={isSessionOpened}
                    nodesConnectable={isSessionOpened}
                    elementsSelectable={isSessionOpened}
                    panOnDrag={isSessionOpened}
                    deleteKey={isSessionOpened ? ["Backspace", "Delete"] : []}
                    on:dragover={onDragOver}
                    on:drop={onDrop}
                    on:nodecontextmenu={onNodeContextMenu}
                    on:edgecontextmenu={onEdgeContextMenu}
                    on:paneclick={onPaneClick}
                    on:nodedrag={onNodeDrag}
                    on:nodedragstop={onNodeDragStop}
                    ondelete={onDelete}
                    onedgecreate={onEdgeCreate}
        >

            {#each $cursors as cursor}
                <Cursor data={cursor}/>
            {/each}

            <Background/>

            {#if isSessionOpened}
                <NodeContextMenu
                        position={clickedPosition}
                        node={selectedNode}
                        on:update={onUpdateNode}
                        on:delete={onDeleteNode}
                />
                <EdgeContextMenu
                        position={clickedPosition}
                        edge={selectedEdge}
                        on:update={onUpdateEdge}
                        on:delete={onDeleteEdge}
                />
            {/if}
        </SvelteFlow>
    {/if}
</div>

<svelte:window
        on:keydown={onKeyDown}
        on:mousemove={throttledOnMouseMove}
/>

<style>
    .editor-wrapper {
        min-height: 45rem;
    }
</style>
