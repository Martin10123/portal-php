<template>
  <Navbar :toggle-open-sidebar="toggleOpenSidebar" />
  <main class="w-full bg-slate-200 flex items-center">
    <SideBarMain :openSidebar="openSidebar" :toggleOpenSidebar="toggleOpenSidebar" />

    <div class="bg-slate-200 flex flex-col items-center justify-center w-full h-full">
      <h1 class="text-3xl font-bold text-slate-900">Bienvenido, {{ user.name }}</h1>
      <p class="text-slate-700">Estas en linea ahora, pero {{ showMessageIfAdmin }}</p>
    </div>
  </main>
</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import SideBarMain from '@/Components/SideBar/SideBarMain.vue';
import { useNavSidebar } from '@/Composables';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const { props } = usePage();
const { openSidebar, toggleOpenSidebar } = useNavSidebar()

const user = computed(() => props.auth.user);
const IsPrivileged = computed(() => props.auth.user.IsPrivileged);
let showMessageIfAdmin = ''

if (IsPrivileged.value == 1) {
  showMessageIfAdmin = 'eres admin';
} else if (IsPrivileged.value == 0) {
  showMessageIfAdmin = 'no eres admin';
} else {
  showMessageIfAdmin = 'eres invitado';
}

</script>
