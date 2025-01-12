<script>
import SessionCard from "../components/SessionCard.svelte";
import { get } from "../utils/fetch.js";

const sessionsPromise = get("/users/sessions");
</script>

<main>
    <h1>Available sessions</h1>
    {#await sessionsPromise}
        <h2>Loading sessions...</h2>
    {:then sessions}
        <div class="grid grid-cols-3">
        {#each sessions as session}
            <SessionCard
                    title={session.name}
                    state={session.is_open ? 'Open' : 'Closed'}
                    id={session.id}
            />
        {/each}
        </div>
    {:catch error}
        <p> An error occurred: {error.message}</p>
    {/await}
</main>