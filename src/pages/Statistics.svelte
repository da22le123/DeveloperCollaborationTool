<script>
import { get } from "../utils/fetch.js";
import { onMount } from "svelte";
import PieChart from "../components/PieChart.svelte";
import TImeChart from "../components/TimeChart.svelte";
import BarChart from "../components/BarChart.svelte";

export let params;
const sessionId = params.params.id;

let actions;

//data for diagrams
let dates;
let users;
let usernames;
let userActions;
let loading = true;
let additionsByUser;
let deletionsByUser;
let modificationsByUser;
const mapAdditionsByUser = new Map();
const mapModificationsByUser = new Map();
const mapDeletionsByUser = new Map();

let timeline;

const mapArrayValues = (arr) => {
    return arr.reduce((acc, arrayValue) => {
        acc.set(arrayValue, (acc.get(arrayValue) || 0) + 1);
        return acc;
    }, new Map());
};

const calculateActionsTimeline = (actions) => {
    let lastValue = 0;
    const values = [];
    const dates = [];
    for (const action of actions) {
        lastValue++;
        dates.push(new Date(action.creation_date));
        values.push(lastValue);
    }
    return [dates, values];
};

const generateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];
    while (start <= end) {
        dateArray.push(new Date(start).toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
    }
    return dateArray;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const mapTypesOfActions = (actions) => {
    for (const action of actions) {
        const username = action.User.username;
        const type = action.action_data.type;
        if (type === "NODE_ADD" || type === "EDGE_ADD") {
            mapAdditionsByUser.set(
                username,
                (mapAdditionsByUser.get(username) || 0) + 1,
            );
        } else if (type === "NODE_DELETE" || type === "NODE_ADD") {
            mapDeletionsByUser.set(
                username,
                (mapDeletionsByUser.get(username) || 0) + 1,
            );
        } else if (type === "NODE_UPDATE" || type === "EDGE_UPDATE") {
            mapModificationsByUser.set(
                username,
                (mapModificationsByUser.get(username) || 0) + 1,
            );
        }
    }
};

onMount(async () => {
    try {
        actions = await get(`/actions/${sessionId}`);

        // Extract dates and users
        dates = actions.map((action) => formatDate(action.creation_date));
        users = actions.map((action) => action.User.username);
        let userCounts = mapArrayValues(users);
        usernames = Array.from(userCounts.keys());
        userActions = Array.from(userCounts.values());

        timeline = calculateActionsTimeline(actions);

        mapTypesOfActions(actions);
        modificationsByUser = usernames.map((username) =>
            mapModificationsByUser.get(username),
        );
        additionsByUser = usernames.map((username) =>
            mapAdditionsByUser.get(username),
        );
        deletionsByUser = usernames.map((username) =>
            mapDeletionsByUser.get(username),
        );
        loading = false;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
</script>

{#if loading}
    <div class="flex justify-center items-center h-screen text-xl text-gray-700">
        <span class="animate-pulse">Loading Data...</span>
    </div>
{:else}
    <div class="space-y-8 p-6">
        <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold text-center mb-6">User Contribution</h2>
            <div class="relative w-full h-80">
                <PieChart {usernames} {userActions} />
            </div>
        </div>

        <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold text-center mb-6">Work Flow</h2>
            <div class="relative w-full h-80">
                <TImeChart dates={timeline[0]} values={timeline[1]} />
            </div>
        </div>
     <div class="max-w-3xl mx-auto">
            <h2 class="text-2xl font-semibold text-center mb-6"> Type Of Actions By User</h2>
            <div class="relative w-full h-80">
                <BarChart {usernames} {additionsByUser} {modificationsByUser} {deletionsByUser}/>
            </div>
        </div>
    </div>
{/if}
