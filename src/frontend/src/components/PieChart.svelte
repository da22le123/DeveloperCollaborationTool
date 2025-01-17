<script>
    import { Pie } from 'svelte-chartjs';
    import 'chart.js/auto';


    export let usernames = [];
    export let userActions = [];

    const chartData = {
        labels: usernames,
        datasets: [
            {
                label: 'User Actions',
                data: userActions,
                borderWidth: 1,
            },
        ],
    };
</script>

<Pie data={chartData} width={300} height={300} options={{ maintainAspectRatio: false }} />