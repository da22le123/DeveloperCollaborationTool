<script>
import { createEventDispatcher } from "svelte";

export let options;
export let id;
export let label;
export let selected = undefined;

const dispatch = createEventDispatcher();

const onChange = (event) => dispatch("change", event.target.value);
</script>

<div class="flex justify-between mb-1">
    <label for={id}>{label}</label>

    <select id={id} class="px-2 w-32" on:change={onChange}>
        {#each options as option (option.value)}
            <option value={option.value} selected={option.value === selected}>{option.label}</option>
        {/each}
    </select>
</div>
