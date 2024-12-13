<script>
import { writable } from "svelte/store";
import { onDestroy, setContext } from "svelte";

const newNode = writable(null);

setContext("newNode", newNode);

onDestroy(() => {
    newNode.set(null);
});
</script>

<slot />
