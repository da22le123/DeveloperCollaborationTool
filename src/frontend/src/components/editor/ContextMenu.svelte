<script>
export let position;
export let hide = false;
</script>

<div style="top: {position.y}px; left: {position.x}px" class="fixed bg-white border-black border-2 rounded py-2 px-3 context-menu" class:hidden={hide}>
    <slot />
</div>

<style>
    .context-menu {
        z-index: 1000;
    }
</style>
