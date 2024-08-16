<template>
    <Modal :show="openModalHours" @close="handleOpenModalHours">
        <template #header>
            <h1 class="text-2xl font-medium text-center">Horas disponibles</h1>
        </template>

        <div class="p-4">
            <h2 class="text-xl font-medium">
                Fecha seleccionada: <span class="font-normal">{{ formatDate() }}</span>
            </h2>

            <div class="py-4 grid gap-2">
                <h3>¿Cuanto tiempo necesitas el laboratorio?</h3>
                <div class="flex items-center gap-4">
                    <label>Tiempo necesario</label>

                    <select class="w-max border-gray-300 rounded-md shadow-sm" v-model="timeNecessary">
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="90">1:30 horas</option>
                        <option value="120">2 horas</option>
                        <option value="150">2:30 horas</option>
                        <option value="180">3 horas</option>
                    </select>
                </div>
            </div>

            <div>
                <h3 class="text-lg font-medium mt-4">Horas disponibles</h3>
                <div class="grid grid-cols-4 gap-4 mt-2">
                    <div v-for="hour in hoursAvailable" :key="hour.hour"
                        :class="{ 'bg-zinc-200 cursor-not-allowed': !hour.available, 'cursor-pointer hover:bg-slate-100': hour.available }"
                        class="flex items-center justify-center p-2 border border-gray-300 rounded-md"
                        @click="hour.available && handleSelectHour(hour)">
                        <span>{{ hour.hour }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>

<script setup>
import Modal from '@/Components/Modal.vue';
import { onMounted, ref, watch } from 'vue';
import { format, setHours, addMinutes, startOfDay, isSameDay, parseISO, isBefore, isEqual, isAfter } from 'date-fns';

const props = defineProps({
    openModalHours: Boolean,
    handleOpenModalHours: Function,
    events: Array,
    form: Object,
});

const timeNecessary = ref(30);

const generateHoursAvailable = (startHour = 7, endHour = 17, interval = 30) => {
    const hours = [];
    const start = startOfDay(new Date(props.form.date));
    const end = setHours(start, endHour);
    let current = setHours(start, startHour);

    const now = new Date();

    if (isBefore(now, startOfDay(new Date(props.form.date)))) {
        now.setHours(startHour, 0, 0, 0);
    } else if (isEqual(now, startOfDay(new Date(props.form.date)))) {
        current = now;
    }

    const eventsForTheDay = props.events.filter(event => isSameDay(new Date(event.start), start));

    while (current <= end) {
        const hourString = format(current, 'HH:mm');
        const minuteValue = current.getHours() + current.getMinutes() / 60;
        const isLunchTime = hourString === '12:30' || hourString === '13:00';
        const isBlocked = isBefore(current, now) && !isEqual(current, now);

        // Validación de tiempo necesario
        const futureTime = addMinutes(current, timeNecessary.value);
        const isOutOfBounds = isAfter(futureTime, setHours(start, endHour));
        const isOccupied = eventsForTheDay.some(event => {
            const eventStart = parseISO(event.start);
            const eventEnd = parseISO(event.end);

            return (current >= eventStart && current < eventEnd) ||
                   (futureTime > eventStart && futureTime <= eventEnd) ||
                   (current <= eventStart && futureTime > eventStart);
        });

        const crossesLunchTime = (hourString < '12:30' && format(futureTime, 'HH:mm') > '12:30') || 
                                  (hourString < '13:00' && format(futureTime, 'HH:mm') > '13:00');

        // Bloquear horas de cierre si no cabe el tiempo necesario
        const isBlockedDueToEnd = isAfter(current, setHours(start, endHour - interval)) && futureTime > end;
        
        hours.push({
            hour: hourString,
            minutes: minuteValue,
            available: !isLunchTime && !isBlocked && !isOutOfBounds && !isOccupied && !crossesLunchTime && !isBlockedDueToEnd,
            hourByNewDate: current,
        });

        current = addMinutes(current, interval);
    }

    return hours;
};

const hoursAvailable = ref(generateHoursAvailable());

const handleSelectHour = (hour) => {
    const duration = timeNecessary.value / 60;
    const hourEnd = hoursAvailable.value.find(h => h.minutes === hour.minutes + duration);

    if (hourEnd) {
        props.form.dateHours = [hour.hour, hourEnd.hour];
        props.handleOpenModalHours();
    }
};

const updateHours = () => {
    hoursAvailable.value = generateHoursAvailable();
};

const formatDate = () => {
    return format(new Date(props.form.date), 'eeee d MMMM yyyy');
};

watch(timeNecessary, () => {
    updateHours();
});

watch(() => props.form.date, () => {
    updateHours();
});

onMounted(() => {
    updateHours();
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
    transform: translateX(50px);
    opacity: 0;
}
</style>