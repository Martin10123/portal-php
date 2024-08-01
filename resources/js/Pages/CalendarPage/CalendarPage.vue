<template>
    <Navbar />

    <section class="h-[calc(100vh-4.1rem)]">
        <article class="relative h-full">

            <FullCalendar class="w-full" :options="calendarOptions" />

            <button class="absolute bottom-5 right-5 p-2 shadow-md rounded-full bg-primary-cotecmar cursor-pointer z-50"
                @click="onCreateEvent">
                <img class="w-10 object-cover" :src="createIcon" alt="Create icon">
            </button>
        </article>

        <ModalCalendar :open-modal="openModal" :on-create-event="onCreateEvent" :form="form"
            :on-save-event="onSaveEvent" :handle-open-modal-hours="handleOpenModalHours"
            :open-modal-hours="openModalHours" :events="events" />

        <ModalViewInfo v-if="openShowInfo" :on-view-info-event="onViewInfoEvent"
            :info-selected-event="infoSelectedEvent" :on-edit-event="onEditEvent" />
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
    onSaveEvent,
    onCreateEvent,
    onViewInfoEvent,
    onEditEvent,
    handleOpenModalHours,
} = useCalendarPage()

</script>
