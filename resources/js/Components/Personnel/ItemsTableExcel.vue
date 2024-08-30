<template>
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {{ row.grafo_op }}
    </th>
    <td class="px-6 py-4">{{ row.proyecto }}</td>
    <td class="px-6 py-4">
        {{ row.operacion_proceso }}
    </td>
    <td class="px-6 py-4">{{ row.codigo_sap }}</td>
    <td class="px-6 py-4">{{ row.fase }}</td>
    <td class="px-6 py-4">{{ row.swbs }}</td>
    <td class="px-6 py-4">{{ row.estado }}</td>
    <td class="px-6 py-4">{{ row.bloque }}</td>
    <td class="px-6 py-4">{{ row.caso }}</td>
    <td class="px-6 py-4">
        <div class="flex justify-center items-center gap-2">
            <img class="w-5 h-5 cursor-pointer" src="@/Assets/edit.svg" alt="editar grafo"
                @click="() => startEditing(row)">
            <img class="w-5 h-5 cursor-pointer" src="@/Assets/remove.svg" alt="eliminar grafo"
                @click="() => onDeleteGraphSelect(row)">
            >
        </div>
    </td>
</template>

<script setup>
const { row, startEditing, onDeleteGraphSelect } = defineProps(['row', 'startEditing', 'onDeleteGraphSelect']);
</script>