<script>
import router from "page";

import { showPopup, popupMessage, popupDuration } from "./stores/popupStore.js";
import { isAdminStore, isLeadStore, tokenStore } from "./stores/tokenStore.js";

import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import Login from "./pages/Login.svelte";
import Header from "./components/Header.svelte";
import ManageUsers from "./pages/ManageUsers.svelte";
import Session from "./pages/Session.svelte";
import NewUser from "./pages/RegisterNewUser.svelte";
import PopupMessage from "./components/PopupMessage.svelte";
import CreateSession from "./pages/CreateSession.svelte";
import AddUsers from "./pages/AddUsers.svelte";
import Statistics from "./pages/Statistics.svelte";

let page;
let params;
let currentRoute;

const guestOnly = (ctx, next) => {
    if ($tokenStore) {
        router.redirect("/");
    } else {
        next();
    }
};

const authenticated = (ctx, next) => {
    if ($tokenStore) {
        next();
    } else {
        router.redirect("/login");
    }
};

const admin = (ctx, next) => {
    if ($isAdminStore) {
        next();
    } else {
        router.redirect("/");
    }
};

const leader = (ctx, next) => {
    if ($isLeadStore || $isAdminStore) {
        next();
    } else {
        router.redirect("/");
    }
};

const render = (pageComponent, ctx) => {
    page = pageComponent;
    params = ctx;
    currentRoute = ctx.pathname;
};

router("/", authenticated, (ctx) => render(Home, ctx));

router("/login", guestOnly, (ctx) => render(Login, ctx));

router("/sessions/create", authenticated, leader, (ctx) =>
    render(CreateSession, ctx),
);
router("/sessions/:id", authenticated, (ctx) => render(Session, ctx));
router("/sessions/:id/statistics", authenticated, (ctx) =>
    render(Statistics, ctx),
);
router("/sessions/:id/invitations", authenticated, leader, (ctx) =>
    render(AddUsers, ctx),
);

router("/register", authenticated, admin, (ctx) => render(NewUser, ctx));

router("/manage-users", authenticated, admin, (ctx) =>
    render(ManageUsers, ctx),
);

router("*", (ctx) => render(NotFound, ctx));

router.start();
</script>

<Header/>

<main class="pt-16">
    <svelte:component this={page} {params}/>

    <PopupMessage message={$popupMessage.message}
                  type={$popupMessage.type}
                  isVisible={$showPopup}
                  duration={$popupDuration}/>
</main>
