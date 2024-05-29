<template>

  <main class="w-full h-screen bg-slate-200">
    <nav class="bg-white shadow-md h-screen flex flex-col">
      <div class="w-full flex items-center justify-between bg-white shadow-md p-2">
        <LogoCotecmar />
        <button>
          <Hamburguer />
        </button>
      </div>

      <div class="w-full h-full flex flex-col justify-between">
        <ul>
          <li class="text-lg border-b-2 pb-2" v-for="{ title, hasSubItems, other, icon } in optionsItem">
            <span class="flex justify-between items-center p-4">
              <img :src="icon" alt="">
              {{ title }}

              <template v-if="hasSubItems">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                  stroke="currentColor" class="w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </template>
            </span>

            <ul v-if="hasSubItems" class="px-10">
              <li class="p-2" v-for="{ title, goTo } in other">
                {{ title }}
              </li>
            </ul>
          </li>
        </ul>

        <div class="flex items-center gap-5">
          <img src="../Assets/avatar.png" class="w-20 h-auto rounded-full py-3" alt="Avatar del usuario">

          <div>
            <p>Martin Elias Simarra Salgado</p>
            <p>martinsimarra4@cotecmar.com</p>
          </div>
        </div>
      </div>
    </nav>
  </main>

</template>

<script setup>
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo.vue';
import Hamburguer from '@/Assets/HamburguerIcon.vue';
import LogoCotecmar from '@/Assets/LogoCotecmar.vue';
import { ref } from 'vue';

const openItems = ref(false);

const onOpenItems = () => {
  openItems.value = !openItems.value;
};

const optionsItem = [
  {
    title: "Requerimientos",
    goTo: "/gedin/permisos",
    hasSubItems: true,
    icon: "@/Assets/RequerimientosIcon.svg",
    other: [
      { title: "Agregar solicitud", goTo: "/gedin/permisos/agregar" },
      { title: "Consultar solicitud", goTo: "/gedin/permisos/listar" },
      { title: "Aprobar solicitud", goTo: "/gedin/permisos/aprobar" },
    ]
  },
];

</script>