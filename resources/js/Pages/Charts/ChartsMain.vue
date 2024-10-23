<template>

    <AppLayout title="Graficos">
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

                <div class="card overflow-x-auto">
                    <div v-for="(chartData, index) in data" :key="index">
                        <OrganizationChart :value="chartData || []" collapsible>
                            <template #person="slotProps">
                                <div class="flex flex-col">
                                    <div class="flex flex-col items-center">
                                        <img :alt="slotProps.node.data.name" :src="slotProps.node.data.image"
                                            class="mb-4 w-12 h-12" />
                                        <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
                                        <span>{{ slotProps.node.data.title }}</span>
                                    </div>
                                </div>
                            </template>
                            <template #default="slotProps">
                                <span>{{ slotProps.node.label }}</span>
                            </template>
                        </OrganizationChart>
                    </div>

                </div>
            </article>
        </section>
    </AppLayout>
</template>

<script setup>
import ModalListCharts from '@/Components/Charts/ModalListCharts.vue';
import AppLayout from '@/Layouts/AppLayout.vue';
import OrganizationChart from 'primevue/organizationchart';
import { onMounted, ref } from 'vue';

const getUsuariosGerencia = ref([]);
const showListCharts = ref(false);
const data = ref({});

const getGerenciaUsuarioActivo = async () => {
    try {
        const response = await axios.get(route("users.getUsuariosGerencia"));
        getUsuariosGerencia.value = response.data;

        const getBoss = getUsuariosGerencia.value.filter(user => user.EsJefe === "1");

        data.value =
            getBoss.map((boss) => {
                return {
                    type: boss.DivisionName,
                    label: boss.Nombre,
                    data: boss.Nombre.substring(0, 2),
                    children: getUsuariosGerencia.value
                        .filter(user => user.IsAdmin === "1")
                        .map(user => {
                            return {
                                key: `${boss.idResponsable}_${user.idResponsable}`,
                                type: 'División',
                                label: user.Nombre,
                                data: user.Nombre.substring(0, 2),
                                children: getUsuariosGerencia.value
                                    .filter(subUser => subUser.IsAdmin === "0" && subUser.EsJefe === "0")
                                    .map(subUser => {
                                        return {
                                            key: `${boss.idResponsable}_${user.idResponsable}_${user.idResponsable}`,
                                            type: 'División',
                                            label: subUser.Nombre,
                                            data: subUser.Nombre.substring(0, 2)
                                        };
                                    })
                            };
                        })
                };
            })


    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    getGerenciaUsuarioActivo();
});

</script>