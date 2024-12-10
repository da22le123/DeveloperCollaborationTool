<script>
import router from "page";

import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import Login from "./pages/Login.svelte";
import Header from "./components/Header.svelte";
import ManageUsers from "./pages/ManageUsers.svelte";
import Session from "./pages/Session.svelte";
import NewUser from "./pages/RegisterNewUser.svelte";
import { showPopup, popupMessage } from "./stores/popupStore.js";
import PopupMessage from "./components/PopupMessage.svelte";

let page;
let params;
let currentRoute;

const render = (pageComponent, ctx) => {
    page = pageComponent;
    params = ctx;
    currentRoute = ctx.pathname;
};

router("/", (ctx) => render(Home, ctx));

router("/login", (ctx) => render(Login, ctx));

router("/sessions/:id", (ctx) => render(Session, ctx));

router("/register", (ctx) => render(NewUser, ctx));

router("/manage-users", (ctx) => render(ManageUsers, ctx));

router("*", (ctx) => render(NotFound, ctx));

router.start();
</script>

<Header/>

<main>
    <svelte:component this={page} {params}/>

    <PopupMessage message={$popupMessage.message}
                  type={$popupMessage.type}
                  isVisible={$showPopup}/>
</main>
