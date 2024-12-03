<script>
import { Background, SvelteFlow } from '@xyflow/svelte';
import { writable } from 'svelte/store';

import '@xyflow/svelte/dist/style.css';

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
</script>

<div class="w-full h-full editor-wrapper">
    <SvelteFlow {nodes} {edges} snapGrid={[25, 25]} fitView proOptions={{ hideAttribution: true }}>
        <Background />
    </SvelteFlow>
</div>

<style>
    .editor-wrapper {
        min-height: 45rem;
    }
</style>
