<script>
import { Bar } from "svelte-chartjs";
import "chart.js/auto";

export let usernames;
export let additionsByUser;
export let modificationsByUser;
export let deletionsByUser;

const labels = usernames;
const data = {
    labels: labels,
    datasets: [
        {
            label: "Added",
            data: additionsByUser,
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 1,
        },
        {
            label: "Updated",
            data: modificationsByUser,
            backgroundColor: "blue",
            borderColor: "blue",
            borderWidth: 1,
        },
        {
            label: "Deleted",
            data: deletionsByUser,
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
        },
    ],
};
</script>

<Bar data={data} width={300} height={300} options={{maintainAspectRatio: false}} />