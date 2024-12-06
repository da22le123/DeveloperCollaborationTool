<script>
import { tokenStore, clearToken } from "../stores/tokenStore.js";
import page from "page";

const loginTest = () => {
    page("/login");
};
</script>

<main class="pt-16 px-6">
    <div class="card"></div>
    {#if $tokenStore}
        <strong>Hello user!!!</strong>
        <button on:click={clearToken}>Logout test</button>
    {:else}
        <button on:click={loginTest}>Login test</button>
    {/if}
</main>
