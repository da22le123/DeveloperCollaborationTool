<script>
import { writable } from "svelte/store";
import { Background, SvelteFlow } from "@xyflow/svelte";

/** @type {{nodes: any[], edges: any[]} | null} */
export let snapshot = null;
export let onClose;

let nodes = writable([]); // Use writable store for nodes
let edges = writable([]); // Use writable store for edges

const loadData = () => {
    if (snapshot) {
        nodes.set(snapshot.nodes);
        edges.set(snapshot.edges);
    } else {
        nodes.set([]);
        edges.set([]);
    }
};

// Parse and transform snapshot data when it changes
$: if (snapshot) {
    loadData();
}
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center mr-64">
    <div class="bg-white rounded-lg shadow-lg p-5 w-4/5 max-w-4xl relative">
        <button
                class="absolute top-3 right-3 text-gray-500 hover:text-white hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                on:click={onClose}
                aria-label="Close"
        >
            ✕
        </button>

        <h2 class="text-lg font-bold mb-3">Snapshot</h2>

        <div class="border rounded-lg w-full flex">
            <SvelteFlow {nodes} {edges} nodesDraggable={false} proOptions={{ hideAttribution: true }} fitView class="h-full min-h-[400px]">
                <Background />
            </SvelteFlow>
        </div>
    </div>
</div>
