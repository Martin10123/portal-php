<template>
    <Transition name="slide-fade">
        <section class="border-l right-0 z-50 shadow-lg fixed w-full h-screen top-0 left-0 flex  duration-200"
            v-if="openFilterByPlaces">

        </section>
    </Transition>
</template>

<script setup>
import { useDataCalendarStore } from '@/pinia/useDataCalendarStore';
import { ref, watch } from "vue";

defineProps({
    openFilterByPlaces: Boolean,
    handleOpenFilterByPlaces: Function
});

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