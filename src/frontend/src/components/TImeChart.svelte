<script>
    import { Line } from 'svelte-chartjs';
    import 'chart.js/auto';


    export let activeDates;
    export let projectDates;
    export let actionsByDates;


    const chartData = {
        labels: activeDates,
        datasets: [
            {
                label: 'Chart',
                data: projectDates.map((date) => {
                    // Match projectDates with actionsByDates
                    const index = activeDates.indexOf(date);
                    return index !== -1 ? actionsByDates[index] : 0; // Fill gaps with 0
                }),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
        ],
    };
</script>

<Line data={chartData} width={100} height={100} options={{ maintainAspectRatio: false }} />
