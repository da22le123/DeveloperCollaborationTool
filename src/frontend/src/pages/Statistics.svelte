<script>
import { get } from "../utils/fetch.js";
import { onMount } from "svelte";
import PieChart from "../components/PieChart.svelte";
import TImeChart from "../components/TImeChart.svelte";

let session_id = 1;
let historyPromise;
let dates;
let users;
let usernames;
let userActions;
let activeDates;
let actionsByDates;
let projectDates;
let loading = true;

const mapArrayValues = (userArray) => {
    return userArray.reduce((acc, arrayValue) => {
        acc.set(arrayValue, (acc.get(arrayValue) || 0) + 1);
        return acc;
    }, new Map());
};

const generateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    while (start <= end) {
        dateArray.push(new Date(start).toISOString().split("T")[0]);
        start.setDate(start.getDate() + 1);
    }
    return dateArray;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
    return `${year}-${month}-${day}`;
};



onMount(async () => {
    try {
        historyPromise = await get(`/actions/${session_id}`, { session_id });

        // Extract dates and users
        dates = historyPromise.map((action) =>
            formatDate(action.creation_date),
        );
        users = historyPromise.map((action) => action.User.username);
        let userCounts = mapArrayValues(users);
        usernames = Array.from(userCounts.keys());
        userActions = Array.from(userCounts.values());

        let dateActions = mapArrayValues(dates);
        activeDates = Array.from(dateActions.keys());
        actionsByDates = Array.from(dateActions.values());
        projectDates = generateDateRange(
            activeDates[0],
            new Date().toISOString().split("T")[0],
        );
        console.log(projectDates);
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
                <TImeChart {activeDates} {projectDates} {actionsByDates} />
            </div>
        </div>
    </div>
{/if}
