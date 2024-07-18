<template>

    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">

        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="p-2 w-full overflow-auto">
            <header class="flex-1">
                <div class="py-2">
                    <h1 class="text-2xl text-center font-semibold">Asignación de requerimientos</h1>
                </div>
            </header>

            <div class="w-full h-52 bg-primar bg-gray-200 flex justify-center items-center">
                <h1 class="text-4xl">Dashboard</h1>
            </div>

            <article>
                <div class="py-2 md: md:pt-10 pb-4 flex flex-col items-end justify-end">
                    <label class="text-lg">Buscar</label>
                    <TextInput type="text" class="mt-1 block w-full md:w-96" autofocus placeholder="Buscar..." />
                </div>

                <div>
                    <TableRequeriment :handle-show-modal="handleShowModal" />
                </div>

                <FormEdit :ref-modal="refModal" :handle-show-modal="handleShowModal" />

            </article>
        </section>

    </main>
</template>

<script setup lang="ts">
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import TextInput from '@/Components/TextInput.vue';
import { useNavSidebar } from '@/Composables';
import FormEdit from "@/Components/AssignRequest/FormEdit.vue"
import { ref } from 'vue';
import TableRequeriment from '@/Components/AssignRequest/TableRequeriment.vue';

const { openSidebar, toggleOpenSidebar } = useNavSidebar()

const refModal = ref(false)

const handleShowModal = () => {
    refModal.value = !refModal.value
}

</script>