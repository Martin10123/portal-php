<template>
    <Navbar />

    <div v-if="isLoadingData">
        <div class="flex justify-center items-center h-[calc(100vh-4.1rem)]">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-cotecmar"></div>
        </div>
    </div>

    <section v-else class="h-[calc(100vh-4.1rem)]">
        <article class="relative h-full">

            <FullCalendar class="w-full" :options="calendarOptions" />

            <button class="absolute bottom-5 right-5 p-2 shadow-md rounded-full bg-primary-cotecmar cursor-pointer z-50"
                @click="onCreateEvent">
                <img class="w-10 object-cover" :src="createIcon" alt="Create icon">
            </button>
        </article>

        <ModalCalendar :open-modal="openModal" :on-create-event="onCreateEvent" :form="form"
            :on-save-event="onSaveEvent" :handle-open-modal-hours="handleOpenModalHours"
            :open-modal-hours="openModalHours" :events="events" :is-loading-save-event="isLoadingSaveEvent" />

        <ModalViewInfo v-if="openShowInfo" :on-view-info-event="onViewInfoEvent"
            :info-selected-event="infoSelectedEvent" :on-edit-event="onEditEvent" :on-delete-event="onDeleteEvent" />
    </section>
</template>

<script setup>
import Navbar from '@/Components/SideBar/Navbar.vue';
import createIcon from "@/Assets/createIcon.svg"
import ModalCalendar from '@/Components/CalendarPage/ModalCalendar.vue';
import ModalViewInfo from '@/Components/CalendarPage/ModalViewInfo.vue';
import { useCalendarPage } from '@/Composables';

const {
    calendarOptions,
    form,
    infoSelectedEvent,
    openModalHours,
    openModal,
    openShowInfo,
    events,
    isLoadingData,
    isLoadingSaveEvent,
    onSaveEvent,
    onCreateEvent,
    onViewInfoEvent,
    onEditEvent,
    handleOpenModalHours,
    onDeleteEvent
} = useCalendarPage()

</script>
