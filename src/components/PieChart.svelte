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
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 205, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
</script>

<Pie data={chartData} width={300} height={300} options={{ maintainAspectRatio: false }} />