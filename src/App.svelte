<script>
import router from "page";

import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import LoginPage from "./pages/LoginPage.svelte";

let page;
let params;
let currentRoute;

router("/", (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
});
router("*", (ctx) => {
    page = NotFound;
    currentRoute = ctx.pathname;
});
router("/login", (ctx) => {
    page = LoginPage;
    currentRoute = ctx.pathname;
})

router.start();
</script>

<main>
    <svelte:component this={page} {params} />
</main>

<style>
</style>
