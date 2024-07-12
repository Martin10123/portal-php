<template>
    <Navbar :toggleOpenSidebar="toggleOpenSidebar" />

    <main class="sm:grid sm:grid-cols-01">

        <SideBarMain class-name="sm:w-full lg:w-full" :openSidebar="openSidebar"
            :toggleOpenSidebar="toggleOpenSidebar" />

        <section class="">
            <header class="bg-slate-100 pb-10">
                <div class="py-6">
                    <h1 class="text-2xl text-center font-semibold">Listado de grafos por proyecto</h1>
                </div>

                <article class="w-full sm:w-2/5 flex gap-4 m-auto">
                    <div class="w-full grid gap-2">
                        <label class="text-lg">Proyecto</label>
                        <v-select class="bg-white" :options="options" placeholder="Proyecto...">
                        </v-select>
                    </div>
                </article>
            </header>

            <div class="p-4">
                <TablePersonnel />
            </div>
        </section>

    </main>
</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useNavSidebar } from '@/Composables';
import { ref } from 'vue';
import TablePersonnel from '@/Components/Personnel/TablePersonnel.vue';

const { openSidebar, toggleOpenSidebar } = useNavSidebar()

const options = ref([
    { label: 'Proyecto', value: 'project' },
    { label: 'Interesado', value: 'interested' },
    { label: 'Fecha', value: 'date' },
    { label: 'Estado', value: 'status' }
])
</script>