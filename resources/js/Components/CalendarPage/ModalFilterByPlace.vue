<template>
    <Transition name="slide-fade">
        <section class="border-l right-0 z-50 shadow-lg fixed w-full h-screen top-0 left-0 flex  duration-200"
            v-if="openFilterByPlaces">
            <div class="before:content absolute w-full h-screen top-0 left-0 bg-[#0000003b] opacity-100 z-10 duration-400"
                @click="handleOpenFilterByPlaces"></div>
            <div class="w-[30%] border-r p-2 bg-white relative z-50">
                <h2 class="text-2xl font-medium text-primary-cotecmar border-b border-primary-cotecmar p-4">
                    Espacios disponibles
                </h2>
                <ul class="grid gap-2 p-2">
                    <li class="flex items-center gap-2 truncate" v-for="floor in listFloors" :key="floor.id">
                        <input :id="floor.id" type="checkbox" v-model="floor.selected"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">

                        <label class="truncate text-base" :for="floor.id">
                            {{ floor.name }}
                        </label>
                    </li>
                </ul>
            </div>
        </section>
    </Transition>
</template>

<script setup>
import { dataFloorsAvaibleCalendar } from '@/Data/dataFloorsAvaibleCalendar';
import { useDataCalendarStore } from '@/pinia/useDataCalendarStore';
import { ref, watch } from "vue";

defineProps({
    openFilterByPlaces: Boolean,
    handleOpenFilterByPlaces: Function
});

const listFloors = ref(dataFloorsAvaibleCalendar);
const storeCalendar = useDataCalendarStore()

watch(listFloors, (newList) => {
    storeCalendar.getEventsByFloors(newList.filter(floor => floor.selected === true).map(floor => floor.id));
}, { deep: true });

</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-90px);
    opacity: 0;
}
</style>