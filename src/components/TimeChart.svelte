<script>
import { Line } from "svelte-chartjs";
import "chart.js/auto";
import "chartjs-adapter-luxon";

export let dates;
export let values;

const chartData = {
    labels: dates,
    datasets: [
        {
            label: "Chart",
            data: values,
            borderWidth: 1,
        },
    ],
};
const options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            type: "time",
            time: {
                unit: "day",
            },
        },
    },
};
</script>

<Line data={chartData} width={100} height={100} options={options} />
