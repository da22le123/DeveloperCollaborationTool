<script>
import { isAdminStore } from "../stores/tokenStore.js";
import { isLeadStore } from "../stores/tokenStore.js";
import page from "page";
</script>

<div class="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-white shadow-md z-10">
    <h1 class="text-xl font-bold text-gray-800">Purple Alligator</h1>
    {#if $isAdminStore}
        <button
                class="header-action-button"
                on:click={() => page("/manage-users")}
        >
        Manage Users
        </button>
    {/if}
    {#if $isAdminStore || $isLeadStore}
        <button
                class="header-action-button"
                on:click={() => page("/sessions/create")}
        >
            Create Session
        </button>
    {/if}


</div>
<style>
    .header-action-button {
        border-radius: 8px;
        background-color: #000000;
        color: #ffffff;
        padding: 0.6em 1.2em;
        border: none;
        font-family: inherit;
        font-size: 1em;
        font-weight: 400;
        cursor: pointer;
        transition: background-color 0.25s ease;
    }

    .header-action-button:hover {
        background-color: #333333;
    }

    .header-action-button:focus {
        outline: none;
    }
</style>
