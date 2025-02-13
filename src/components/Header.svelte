<script>
import page from "page";
import {
    clearToken,
    isAdminStore,
    isLeadStore,
    tokenStore,
    usernameStore,
} from "../stores/tokenStore.js";
import { getUserRole } from "../utils/user.js";

const onLogoutClick = () => {
    clearToken();
    page.redirect("/login");
};
</script>

<div class="fixed top-0 left-0 w-full flex justify-start items-center px-6 py-4 bg-white shadow-md z-10 gap-12">
    <h1 class="text-xl font-bold"><a href="/">Purple Alligator</a></h1>
    {#if $isAdminStore}
        <a href="/manage-users">Manage Users</a>
        <a href="/register">Create User</a>
    {/if}
    {#if $isAdminStore || $isLeadStore}
        <a href="/sessions/create">Create Session</a>
    {/if}
    <div class="flex-grow"/>
    <div class="flex gap-4 items-center">
        {#if $tokenStore}
            <a href="/settings" class="text-black">
                <strong>Logged in as {$usernameStore} ({getUserRole()})</strong>
            </a>
            <button on:click={onLogoutClick} class="px-4 py-2 -my-2 bg-gray-100 hover:bg-gray-200 rounded font-medium">Log out</button>
        {:else}
            <a href="/login">Log in</a>
        {/if}
    </div>
</div>
