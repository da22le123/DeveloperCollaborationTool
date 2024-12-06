<script>
import router from "page";

import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import Login from "./pages/Login.svelte";
import Header from "./components/Header.svelte";
import ManageUsers from "./pages/ManageUsers.svelte";

let page;
let params;
let currentRoute;

router("/", (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
});
router("/login", (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
});

router("/manage-users", (ctx) => {
    page = ManageUsers; // Set the ManageUsers page
    currentRoute = ctx.pathname;
});

router("*", (ctx) => {
    page = NotFound;
    currentRoute = ctx.pathname;
});

router.start();
</script>
<Header/>

<main>
    <svelte:component this={page} {params} />
</main>

<style>
</style>
