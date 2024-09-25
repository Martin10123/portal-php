<template>
    <div class="p-4">
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2">Color</th>
                    <th class="px-4 py-2">Nombre</th>
                    <th class="px-4 py-2">Encargados</th>
                    <th class="px-4 py-2">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="floor in listFloors" :key="floor.ID">
                    <td class="border px-4 py-2">
                        <div class="flex gap-2">
                            <span class="block w-full h-8" :style="{ background: floor.Sala_Color }"></span>
                        </div>
                    </td>
                    <td class="border px-4 py-2">{{ floor.Sala_Name }}</td>
                    <td class="border px-4 py-2 font-medium">{{
                        floor.responsables.map(responsable => responsable.Nombre).join(', ')
                    }}</td>
                    <td class="border px-4 py-2">
                        <div class="flex items-center gap-2">
                            <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 duration-200"
                                @click="toggleEditFloorModal(floor)">Editar</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 duration-200"
                                @click="deleteFloor(floor.ID)">Eliminar</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import Swal from 'sweetalert2';


defineProps({
    listFloors: Array,
    toggleEditFloorModal: Function
});

const deleteFloor = async (idFloor) => {
    try {

        const responseSwal = await Swal.fire({
            title: '¿Estás seguro de eliminar esta sala?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
        })

        if (!responseSwal.isConfirmed) {
            return;
        }

        const response = await axios.delete(route("calendarPage.deleteFloor", { id: idFloor }));

        if (response.data.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Sala eliminada',
                text: response.data.message
            });
        }
    } catch (error) {
        console.error(error);

        Swal.fire({
            icon: 'error',
            title: 'Error al eliminar la sala',
            text: error.response.data.message
        });
    }
}

</script>