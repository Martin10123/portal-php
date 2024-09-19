<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">
        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section>
            <h1 class="text-4xl p-4">
                Administrar salas de reuniones
            </h1>

            <div>
                <div class="flex justify-between items-center p-4">
                    <h2 class="text-2xl">Salas de reuniones</h2>
                    <div class="flex gap-2">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 duration-200"
                            @click="toggleAddFloorModal">
                            Agregar sala
                        </button>
                        <button class="bg-stone-500 text-white px-4 py-2 rounded hover:bg-stone-600 duration-200">
                            Salas habilitadas
                        </button>
                    </div>
                </div>

                <TableFloors :list-floors="listFloors" />
            </div>
        </section>
    </main>

    <AddFloor :open-add-floor-modal="openAddFloorModal" :toggle-add-floor-modal="toggleAddFloorModal" />
</template>

<script setup>
import AddFloor from '@/Components/CalendarPage/AddFloor.vue';
import TableFloors from '@/Components/CalendarPage/TableFloors.vue';
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useNavSidebar } from '@/Composables';
import { onMounted, ref } from 'vue';

const { openSidebar, toggleOpenSidebar } = useNavSidebar()

const openAddFloorModal = ref(false);
const listFloors = ref([]);

const toggleAddFloorModal = () => {
    openAddFloorModal.value = !openAddFloorModal.value;
}

const getFloors = async () => {
    try {
        const response = await axios.get(route("calendarPage.getAllFloors"));

        console.log(response.data.data);

        listFloors.value = response.data.data;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    getFloors();
});

</script>