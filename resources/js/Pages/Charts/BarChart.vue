<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="p-4 bg-slate-50 border-l">
            <div class="grid gap-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-medium text-gray-300">Control de seguimiento de proyecto</h1>

                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4 shadow-md"
                        @click="onViewReport">
                        Reporte
                    </button>
                </div>

                <div class="w-full grid grid-cols-8 gap-3">
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2">
                        <label class="font-medium">Año</label>
                        <select
                            class="w-full border cursor-pointer border-stone-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-none"
                            v-model="form.anio" name="anio" id="anio">
                            <option value="">Seleccionar</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2">
                        <label class="font-medium">Mes</label>
                        <select
                            class="w-full border cursor-pointer border-stone-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-none"
                            v-model="form.mes" name="mes" id="mes">
                            <option value="">Seleccionar</option>
                            <option value="0">Enero</option>
                            <option value="1">Febrero</option>
                            <option value="2">Marzo</option>
                            <option value="3">Abril</option>
                            <option value="4">Mayo</option>
                            <option value="5">Junio</option>
                            <option value="6">Julio</option>
                            <option value="7">Agosto</option>
                            <option value="8">Septiembre</option>
                            <option value="9">Octubre</option>
                            <option value="10">Noviembre</option>
                            <option value="11">Diciembre</option>
                        </select>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2">
                        <label class="font-medium">División</label>
                        <select
                            class="w-full border cursor-pointer border-stone-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-none"
                            v-model="form.division" name="division" id="division">
                            <option v-for="divi in listDivision" :key="divi.DivisionID" :value="divi.DivisionName">
                                {{ divi.DivisionName }}</option>
                        </select>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid col-span-2 gap-2">
                        <label class="font-medium">Nombre</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.persona" :options="listNombresXGerencia" optionLabel="Nombre"
                                filter placeholder="Selecciona un nombre" :maxSelectedLabels="1" class="w-full" />
                        </div>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 grid gap-2">
                        <label class="font-medium">Caso</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.buque" :options="listCasoBuque" optionLabel="Caso" filter
                                placeholder="Selecciona un caso" :maxSelectedLabels="1" class="w-full"
                                :selection-limit="1" />
                        </div>
                    </div>
                    <div class="w-full shadow-md bg-white rounded-md p-4 col-span-2 grid gap-2">
                        <label class="font-medium">Buque</label>
                        <div class="overflow-hidden">
                            <MultiSelect v-model="form.buque" :options="listCasoBuque" optionLabel="Proyecto" filter
                                placeholder="Selecciona un buque" :maxSelectedLabels="1" class="w-full"
                                :selection-limit="1" />
                        </div>
                    </div>
                </div>
            </div>

            <article class="w-full grid grid-cols-5 gap-3 py-4 relative">
                <div class="w-full col-span-3 grid gap-3 bg-white p-2 rounded-md shadow-md">
                    <h2 class="text-xl font-medium pb-2 border-b border-stone-100">Gráfico de barras</h2>
                    <div class="">
                        <div id="chartColumn" style="width: 100%; height: 500px;"></div>
                    </div>
                </div>

                <div class="w-full col-span-2 grid gap-3 bg-white p-2 rounded-md shadow-md">
                    <h2 class="text-xl font-medium pb-2 border-b border-stone-100">Gráfico de pastel</h2>
                    <div class="">
                        <div id="piechart" style="width: 100%; height: 500px;"></div>
                    </div>
                </div>

                <LoadingStatus />
            </article>
        </section>
    </main>
</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useReports } from '@/Composables';
import { useForm } from '@inertiajs/vue3';
import { onMounted, ref, watch } from 'vue';
import MultiSelect from 'primevue/multiselect';
import Swal from 'sweetalert2';
import LoadingStatus from '@/Components/LoadingStatus.vue';

const { openSidebar, toggleOpenSidebar } = useReports();
const listDivision = ref([]);
const listNombresXGerencia = ref([]);
const listCasoBuque = ref([]);
const loadingCharts = ref(false);

const form = useForm({
    division: '***',
    persona: '',
    caso: '',
    buque: '',
    mes: '',
    anio: ''
});

function drawChart() {
    const data = google.visualization.arrayToDataTable([
        ['Semana - Año', 'HH semanal', 'HH acumulada', { role: 'annotation' }],
        ['w31-2024', 0, 0, 0],
        ['w32-2024', 0, 0, 0],
        ['w33-2024', 0, 0, 0],
        ['w34-2024', 0, 0, 0],
        ['w35-2024', 0, 0, 0],
        ['w36-2024', 0, 0, 0],
    ]);

    const options = {
        chart: {
            title: 'hh semana, hh acumulada',
            subtitle: 'Horas semanales y acumuladas',
        }
    };

    const chart = new google.charts.Bar(document.getElementById('chartColumn'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
}

function drawChart1() {
    const data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['', 1],
    ]);

    const options = {
        title: 'Fase'
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}

const getDivision = async () => {
    try {
        const { data } = await axios.get(route("management.getDivision"));

        listDivision.value = (data.data);
    } catch (error) {
        console.log(error);

    }
}

const getPersonasXGerencia = async (value) => {
    try {
        const { data } = await axios.get(route("users.consultaUsuariosXGerencia", value));

        listNombresXGerencia.value = (data.usuarios);

    } catch (error) {
        console.log(error);
    }
}

const getIdResponsablePersonas = (personas) => {
    console.log(personas);

    return personas.map((p) => p.IdResponsable);
}

const onViewReport = async () => {
    // Validar campos
    if (form.division === '***') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Debes seleccionar una división',
        });
        return;
    }

    loadingCharts.value = true;

    try {
        const response = await axios.get(route("users.consultaDatosSegunPersonaSeleccionada", {
            personas: form.persona.length > 0 ? getIdResponsablePersonas(form.persona) : getIdResponsablePersonas(listNombresXGerencia.value),
            fecha: (form.anio || form.mes) ? new Date(form.anio, form.mes, 1).toISOString().split('T')[0] : null
        }));

        if (!response.data.ok) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'No hay datos para la persona seleccionada',
            });
            return;
        }

        const { semanasData, concurrenciaFase } = response.data;

        // Crear tabla de datos para Google Charts
        const filas = Object.keys(semanasData).map((semana) =>
            semanasData[semana].detalles.length > 0
                ? semanasData[semana].detalles[semanasData[semana].detalles.length - 1]
                : ["No hay registro", 0, 0, 0]
        );

        const data = google.visualization.arrayToDataTable([
            ['Semana - Año', 'HH semanal', 'HH acumulada', { role: 'annotation' }],
            ...filas
        ]);

        // Opciones del gráfico
        const options = {
            chart: {
                title: 'HH semanal, HH acumulada',
                subtitle: 'Horas semanales y acumuladas',
            }
        };

        // Dibujar gráfico
        const chart = new google.charts.Bar(document.getElementById('chartColumn'));
        chart.draw(data, google.charts.Bar.convertOptions(options));

        // Crear gráfico de concurrencia por fase
        const data1 = google.visualization.arrayToDataTable([
            ['Fase', 'Concurrencia'],
            ...Object.entries(concurrenciaFase)
        ]);

        const options1 = {
            title: 'Fase'
        };

        const chart1 = new google.visualization.PieChart(document.getElementById('piechart'));
        chart1.draw(data1, options1);
    } catch (error) {
        console.log(error);
    } finally {
        loadingCharts.value = false;
    }

};

watch(() => form.division, (value) => {
    if (value !== '***') {
        getPersonasXGerencia(value);
    } else {
        listNombresXGerencia.value = [];
    }
})

onMounted(() => {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart1);
})

onMounted(() => {
    getDivision();
})

</script>