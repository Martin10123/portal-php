<template>

    <Head title="Graficos" />

    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="p-4 grid h-max gap-5">
            <ModalListCharts />

            <article class="grid grid-cols-3 gap-6">
                <div class="shadow-md p-4 rounded-lg bg-slate-50 dark:bg-slate-950">
                    <div class="flex justify-between">
                        <h4>Hola mundo</h4>
                        <img class="w-6 h-6 cursor-pointer" src="../../Assets/infoIcon.svg" alt="infoIcon">
                    </div>

                    <p class="text-xl pt-2">30,000</p>
                </div>
                <div class="shadow-md p-4 rounded-lg bg-slate-50 dark:bg-slate-950">
                    <div class="flex justify-between">
                        <h4>Hola mundo</h4>
                        <img class="w-6 h-6 cursor-pointer" src="../../Assets/infoIcon.svg" alt="infoIcon">
                    </div>

                    <p class="text-xl pt-2">30,000</p>
                </div>
                <div class="shadow-md p-4 rounded-lg bg-slate-50 dark:bg-slate-950">
                    <div class="flex justify-between">
                        <h4>Hola mundo</h4>
                        <img class="w-6 h-6 cursor-pointer" src="../../Assets/infoIcon.svg" alt="infoIcon">
                    </div>

                    <p class="text-xl pt-2">30,000</p>
                </div>
            </article>

            <article class="overflow-x-auto">
                <h2>Grafico organizacional</h2>

                <div id="chart_div"></div>
            </article>
        </section>
    </main>
</template>

<script setup>
import ModalListCharts from '@/Components/Charts/ModalListCharts.vue';
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useReports } from '@/Composables';
import { Head } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';

const { openSidebar, toggleOpenSidebar } = useReports();
const getUsuariosGerencia = ref([]);
const showListCharts = ref(false);

const onOpenModal = () => {
    showListCharts.value = !showListCharts.value;
};

const getGerenciaUsuarioActivo = async () => {
    try {
        const response = await axios.get(route("users.getUsuariosGerencia"));
        getUsuariosGerencia.value = response.data;
        drawChart();  // Call drawChart after data is fetched
    } catch (error) {
        console.log(error);
    }
};

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // Check if getUsuariosGerencia.value has data
    if (getUsuariosGerencia.value.length > 0) {
        // Transform API data into Google Charts data format
        const rows = getUsuariosGerencia.value.map(user => {

            const nombreJefe = getUsuariosGerencia.value.find(jefe => jefe.EsJefe)?.Nombre;

            return [
                {
                    v: user.Nombre,
                    f: `${user.Nombre}<div style="color:red; font-style:italic">${user.Cargo}</div>`
                }
                , nombreJefe, user.Nombre
            ];
        });

        data.addRows(rows);
    }

    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    chart.draw(data, { 'allowHtml': true });
}

onMounted(() => {
    getGerenciaUsuarioActivo();
    google.charts.load('current', { 'packages': ['orgchart'] });
    google.charts.setOnLoadCallback(drawChart);
});

</script>