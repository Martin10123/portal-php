<template>
    <div class="p-4">
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2">Color</th>
                    <th class="px-4 py-2">Nombre</th>
                    <th class="px-4 py-2">Responsables</th>
                    <th class="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="floor in listFloors" :key="floor.ID">
                    <td class="border px-4 py-2">
                        <div class="flex gap-2 items-center">
                            <span class="block w-4 h-4" :style="{ background: floor.Sala_Color }"></span>
                            {{ floor.Sala_Color }}
                        </div>
                    </td>
                    <td class="border px-4 py-2">{{ floor.Sala_Name }}</td>
                    <td class="border px-4 py-2">Juan Perez, Maria Lopez</td>
                    <td class="border px-4 py-2">
                        <div class="flex items-center gap-2">
                            <button
                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200">Editar</button>
                            <button
                                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 duration-200">Eliminar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

defineProps({
    listFloors: Array
});
</script>