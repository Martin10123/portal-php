<template>
    <DataTable v-model:expandedRows="expandedRows" :value="products" dataKey="id" tableStyle="min-width: 60rem">
        <Column expander style="width: 5rem" />
        <Column field="name" header="Id" />
        <Column field="name" header="Caso" />
        <Column field="name" header="Proceso" />
        <Column field="name" header="Proyecto" />
        <Column field="name" header="Solicitante" />
        <Column field="name" header="Tipo servicio" />
        <Column field="name" header="Servicio" />
        <Column field="name" header="Detalle" />
        <Column field="name" header="Fecha solución" />
        <Column field="name" header="Asignado" />
        <Column field="name" header="Acción">
            <template #body="slotProps">
                <div class="flex gap-2">
                    <EditIcon />
                    <CreateIcon />
                </div>
            </template>
        </Column>

        <template #expansion="slotProps">
            <div class="p-4">
                <DataTable :value="slotProps.data.orders">
                    <Column expander style="width: 5rem" />
                    <Column field="id" header="Id" />
                    <Column field="name" header="Caso" />
                    <Column field="name" header="Proceso" />
                    <Column field="name" header="Proyecto" />
                    <Column field="name" header="Solicitante" />
                    <Column field="name" header="Tipo servicio" />
                    <Column field="name" header="Servicio" />
                    <Column field="name" header="Detalle" />
                    <Column field="name" header="Fecha solución" />
                    <Column field="name" header="Asignado" />
                    <Column field="name" header="Acción">
                        <template #body="slotProps">
                            <Button icon="pi pi-info-circle" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>
    </DataTable>
</template>

<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

import { ref } from 'vue';
import CreateIcon from '@/Assets/CreateIcon.vue';
import EditIcon from '@/Assets/EditIcon.vue';
import axios from 'axios';

const products = ref([]);
const expandedRows = ref({});

const getAllProjects = async () => {
    const response = await axios.get(route(""))
};

</script>
