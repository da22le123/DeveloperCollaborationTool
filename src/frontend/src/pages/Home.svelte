<script>
import Counter from "../lib/Counter.svelte";
import {tokenStore, clearToken} from "../stores/tokenStore.js";
import page from "page";

const logoutTest = () => {
    clearToken();
};
const loginTest = () => {
    page("/login");
};

</script>

<main>
    <div class="card">
        <Counter />
    </div>
    {#if $tokenStore}
        <strong>Hello user!!!</strong>
        <button on:click={clearToken}>Logout test</button>
        {:else}
        <button on:click={loginTest}>Login test</button>
        {/if}
</main>

<style>
</style>
