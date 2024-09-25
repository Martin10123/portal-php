<template>
    <AppLayout title="Gestionar salas">
        <section>
            <h1 class="text-4xl p-4">Administrar salas de reuniones</h1>

            <div>
                <div class="flex justify-between items-center p-4">
                    <h2 class="text-2xl">Salas de reuniones</h2>
                    <div class="flex gap-2">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-200"
                            @click="toggleAddFloorModal">
                            Agregar sala
                        </button>
                    </div>
                </div>

                <TableFloors :list-floors="listFloors" :toggle-edit-floor-modal="toggleEditFloorModal" />
            </div>
        </section>
    </AppLayout>

    <ModalFloor :open-modal="openAddFloorModal" :toggle-modal="toggleAddFloorModal" @addFloor="onSaveFloor"
        :sala="currentFloor" :is-editing="isEditing" @updateFloor="onUpdateFloor" />
    />
</template>

<script setup>
import ModalFloor from "@/Components/CalendarPage/ModalFloor.vue";
import TableFloors from "@/Components/CalendarPage/TableFloors.vue";
import { useAdminFloor } from "@/Composables";
import AppLayout from "@/Layouts/AppLayout.vue";

const {
    openAddFloorModal,
    toggleAddFloorModal,
    onSaveFloor,
    listFloors,
    currentFloor,
    isEditing,
    toggleEditFloorModal,
    onUpdateFloor,
} = useAdminFloor()

</script>
