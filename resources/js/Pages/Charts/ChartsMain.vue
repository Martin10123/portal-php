<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useReports } from '@/Composables';
import { onMounted } from 'vue';

const { openSidebar, toggleOpenSidebar } = useReports();

const getGerenciaUsuarioActivo = async () => {
    try {
        const response = await axios.get(route("users.getGerencia"));
        console.log(response.data);
    } catch (error) {
        console.log(error);

    }
};

onMounted(() => {

    getGerenciaUsuarioActivo()

    google.charts.load('current', { 'packages': ['orgchart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
            [{ 'v': 'Adolfo Silva', 'f': 'Adolfo Silva<div style="color:red; font-style:italic">Jefe de outfiting</div>' }, '', 'Jefe de outfiting'],
            [{ 'v': 'Jaime Tapia', 'f': 'Jaime Tapia<div style="color:red; font-style:italic">Supervisor</div>' }, 'Adolfo Silva', 'Supervisor'],
            ['Gissell', 'Jaime Tapia', ''],
            ['Martin Elias', 'Jaime Tapia', 'Martin Elias'],
            ['John Baena', 'Adolfo Silva', ''],
            ['Luis', 'Adolfo Silva', ''],
            ['Wendy Carolina', 'Adolfo Silva', ''],
        ]);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, { 'allowHtml': true });
    }
});

</script>

<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="p-4 grid h-max gap-5">
            <h1 class="text-3xl">Charts</h1>

            <article class="grid grid-cols-3 gap-6">
                <div class="shadow-md p-4 rounded-lg bg-slate-50">
                    <div class="flex justify-between">
                        <h4>Hola mundo</h4>
                        <img class="w-6 h-6 cursor-pointer" src="../../Assets/infoIcon.svg" alt="infoIcon">
                    </div>

                    <p class="text-xl pt-2">30,000</p>
                </div>
                <div class="shadow-md p-4 rounded-lg bg-slate-50">
                    <div class="flex justify-between">
                        <h4>Hola mundo</h4>
                        <img class="w-6 h-6 cursor-pointer" src="../../Assets/infoIcon.svg" alt="infoIcon">
                    </div>

                    <p class="text-xl pt-2">30,000</p>
                </div>
                <div class="shadow-md p-4 rounded-lg bg-slate-50">
                    <div class="flex justify-between">
                        <h4>Hola mundo</h4>
                        <img class="w-6 h-6 cursor-pointer" src="../../Assets/infoIcon.svg" alt="infoIcon">
                    </div>

                    <p class="text-xl pt-2">30,000</p>
                </div>
            </article>

            <article class="bg-stale-">
                <h2>Grafico organizacional</h2>

                <div id="chart_div"></div>
            </article>
        </section>
    </main>
</template>