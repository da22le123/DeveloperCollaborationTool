<script>
import { Background, SvelteFlow, useSvelteFlow } from "@xyflow/svelte";
import { createEventDispatcher, getContext } from "svelte";
import { createDebounceWithMap } from "../lib/debounce.js";
import { getBrightness } from "../lib/colors.js";

import NodeContextMenu from "./editor/NodeContextMenu.svelte";
import EdgeContextMenu from "./editor/EdgeContextMenu.svelte";

import "@xyflow/svelte/dist/style.css";

export let nodes;
export let edges;

const {
    screenToFlowPosition,
    viewport,
    updateNode,
    updateNodeData,
    deleteElements,
    getNode,
} = useSvelteFlow();
const newNode = getContext("newNode");
const dispatch = createEventDispatcher();

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

let lastZoom = $viewport.zoom;

// Cancel context menus when the zoom level changes.
$: {
    if ($viewport.zoom !== lastZoom) {
        cancelContextMenus();
        lastZoom = $viewport.zoom;
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
                    on:nodedragstop={onNodeDragStop}
                    ondelete={onDelete}
                    onedgecreate={onEdgeCreate}
        >
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

<svelte:window on:keydown={onKeyDown} />

<style>
    .editor-wrapper {
        min-height: 45rem;
    }
</style>
