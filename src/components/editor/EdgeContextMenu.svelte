<script>
import { MarkerType } from "@xyflow/svelte";
import { createEventDispatcher } from "svelte";

import ContextMenu from "./ContextMenu.svelte";
import OptionSelect from "./OptionSelect.svelte";

const dispatch = createEventDispatcher();

const edgeTypes = [
    { value: "default", label: "Bezier" },
    { value: "straight", label: "Straight" },
    { value: "step", label: "Step" },
    { value: "smoothstep", label: "Smooth step" },
];

const markerTypes = [
    { value: -1, label: "None" },
    { value: MarkerType.Arrow, label: "Arrow" },
    { value: MarkerType.ArrowClosed, label: "Closed arrow" },
];

export let edge;
export let position;

// See the comment in NodeContextMenu.svelte on why the data is bound this way.

let label;
let type;
let markerStart;
let markerEnd;

$: {
    if (edge) {
        label = edge.label;
        type = edge.type;
        markerStart = edge.markerStart?.type;
        markerEnd = edge.markerEnd?.type;
    }
}

$: {
    if (edge) {
        dispatch("update", { label, type, markerStart, markerEnd });
    }
}
</script>

<ContextMenu position={position} hide={!edge}>
    {#if edge}
        <input type="text"
               class="block mb-2 w-full border border-gray-400"
               value={edge.label || ""}
               on:input={event => label = event.target.value}
               maxlength="32" />

        <OptionSelect id="edge_type"
                      label="Type"
                      options={edgeTypes}
                      selected={edge.type}
                      on:change={event => type = event.detail} />

        <OptionSelect id="marker_start_type"
                      label="Start marker"
                      options={markerTypes}
                      selected={edge.markerStart?.type}
                      on:change={event => markerStart = event.detail} />

        <OptionSelect id="marker_end_type"
                      label="End marker"
                      options={markerTypes}
                      selected={edge.markerEnd?.type}
                      on:change={event => markerEnd = event.detail} />
    {/if}
</ContextMenu>
