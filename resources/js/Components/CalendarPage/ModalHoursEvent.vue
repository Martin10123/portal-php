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

const props = defineProps({
    openModalHours: Boolean,
    handleOpenModalHours: Function,
    events: Array,
    form: Object,
});

const timeNecessary = ref(30);

const generateHoursAvailable = (startHour = 7, endHour = 16.5, interval = 30) => {
    const hours = [];
    const totalIntervals = Math.ceil((endHour - startHour) * (60 / interval));

    for (let i = 0; i <= totalIntervals; i++) {
        const hour = startHour + Math.floor((i * interval) / 60);
        const minutes = (i * interval) % 60;
        const hourString = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        const minuteValue = hour + minutes / 60;

        hours.push({
            hour: hourString,
            minutes: minuteValue,
            available: !((hourString === '12:30') || (hourString === '13:00') || (hourString === '16:30')),
            hourByNewDate: new Date().setHours(hour, minutes),
        });
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

const showHoursAvailable = () => {
    const selectedDate = new Date(props.form.date).getDate();
    const eventsDaySelected = props.events.filter(event => new Date(event.start).getDate() === selectedDate);
    const hoursAlreadySelected = eventsDaySelected.map(event => getSelectedHours(event.start, event.end));

    hoursAvailable.value = hoursAvailable.value.map(hour => {
        if (!hour.available) {
            return hour;
        }
        const isTaken = hoursAlreadySelected.some(([start, end]) => hour.minutes >= start && hour.minutes <= end);
        return { ...hour, available: !isTaken };
    });
};

const formatDate = () => {
    return new Date(props.form.date).toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const getSelectedHours = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();
    const startMinutes = startDate.getMinutes();
    const endMinutes = endDate.getMinutes();

    const isHalfHourStart = startMinutes >= 30 && startMinutes < 40;
    const isHalfHourEnd = endMinutes >= 30 && endMinutes < 40;

    if (isHalfHourStart && isHalfHourEnd) {
        return [startHour + 0.5, endHour + 0.5];
    } else if (isHalfHourStart) {
        return [startHour + 0.5, endHour];
    } else if (isHalfHourEnd) {
        return [startHour, endHour + 0.5];
    } else {
        return [startHour, endHour];
    }
};

const resetHoursAvailability = () => {
    hoursAvailable.value = generateHoursAvailable();
};

const disableHoursAccordingToValue = (value) => {
    const duration = value / 60;

    hoursAvailable.value = hoursAvailable.value.map((hour, index, array) => {
        if (!hour.available) {
            return hour;
        }

        const today = new Date();
        const hourNow = today.getHours();
        const isSameDay = today.getDate() === new Date(props.form.date).getDate();

        if (hourNow >= new Date(hour.hourByNewDate).getHours() && isSameDay) {
            return { ...hour, available: false };
        }

        let available = true;
        for (let i = 0; i < duration * 2; i++) {
            const nextIndex = index + i;
            if (nextIndex >= array.length || !array[nextIndex].available) {
                available = false;
                break;
            }
        }

        return { ...hour, available };
    });
};

watch(timeNecessary, (value) => {
    resetHoursAvailability();
    showHoursAvailable();
    disableHoursAccordingToValue(value);
});

onMounted(() => {
    showHoursAvailable();
    disableHoursAccordingToValue(timeNecessary.value);
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