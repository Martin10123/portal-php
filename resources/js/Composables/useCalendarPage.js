import { useForm, usePage } from "@inertiajs/vue3";
import { onMounted, ref } from "vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";
import { validateFormCalendar } from "@/Validations/validCalendarModal";
import { getAllHolidays } from "@/Data/getHolidays";

export const useCalendarPage = () => {
    const openModal = ref(false);
    const openShowInfo = ref(false);
    const openModalHours = ref(false);
    const infoSelectedEvent = ref({});

    const isLoadingData = ref(false);

    const { props } = usePage();

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const events = ref([]);

    const form = useForm({
        title: "",
        description: "",
        date: "",
        division: "",
        isArRequired: false,
        typeService: "",
        dateHours: [],
        participantsNecesary: [],
        participantsOptional: [],
        resource: [],
    });

    const holidays = getAllHolidays().map(
        (date) => date.toISOString().split("T")[0]
    );

    const calendarOptions = ref({
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
        initialView: "timeGridWeek",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        validRange: {
            start: new Date(),
        },
        selectable: true,
        slotEventOverlap: false,
        weekends: false,
        height: "100%",
        locale: esLocale,
        events: events,
        eventClick: function (info) {
            onViewInfoEvent();

            infoSelectedEvent.value = {
                id: info.event.id,
                title: info.event.title,
                description: info.event.extendedProps.description,
                start: info.event.start,
                end: info.event.end,
                participantsNecesary:
                    info.event.extendedProps.participantsNecesary,
                participantsOptional:
                    info.event.extendedProps.participantsOptional,
                resource: info.event.extendedProps.resource,
                division: info.event.extendedProps.division,
                isArRequired: info.event.extendedProps.isArRequired,
                typeService: info.event.extendedProps.typeService,
                uidUser: info.event.extendedProps.uidUser,
            };
        },
        select: function (info) {
            const start = new Date(info.startStr);
            const end = new Date(info.endStr);

            const today = new Date();
            const currentMinutes = today.getMinutes();
            const currentHours = today.getHours();

            if (
                start.getDate() === today.getDate() &&
                (start.getHours() < currentHours ||
                    (start.getHours() === currentHours &&
                        start.getMinutes() < currentMinutes))
            ) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se puede crear eventos en horas pasadas",
                });
                return;
            }

            if (
                info.view.type === "dayGridMonth" ||
                (isWithinBusinessHours(start) && isWithinBusinessHours(end))
            ) {
                const selectedDate = info.startStr.split("T")[0];

                if (holidays.includes(selectedDate)) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pueden crear eventos en días festivos",
                    });
                    return;
                }

                onCreateEvent(info);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pueden crear eventos fuera del horario laboral",
                });
                return;
            }
        },
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "07:00",
            endTime: "16:30",
        },
        datesSet: function () {
            // Deshabilitar visualmente los días festivos
            holidays.forEach((holiday) => {
                const cell = document.querySelector(
                    `td[data-date="${holiday}"]`
                );

                if (cell) {
                    cell.classList.add("fc-nonbusiness");
                }
            });
        },
    });

    const isWithinBusinessHours = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const lunchStartMinute = 30;
        const lunchEndMinute = 30;

        return (
            (hours === 12 && minutes < lunchStartMinute) ||
            (hours === 13 && minutes >= lunchEndMinute) ||
            (hours > 6 && hours <= 12) ||
            (hours > 13 && hours < 16) ||
            (hours === 16 && minutes <= 30)
        );
    };

    const handleOpenModalHours = () => {
        openModalHours.value = !openModalHours.value;
    };

    const onViewInfoEvent = () => {
        openShowInfo.value = !openShowInfo.value;
    };

    const onCreateEvent = (eventSelect) => {
        form.date = eventSelect.start;

        if (eventSelect.view.type !== "dayGridMonth") {
            if (!eventSelect.isTrusted) {
                form.dateHours = [
                    new Date(eventSelect.startStr).toLocaleTimeString(),
                    new Date(eventSelect.endStr).toLocaleTimeString(),
                ];
            }
        }

        if (eventSelect.isTrusted) {
            infoSelectedEvent.value = {};
        }

        openModal.value = !openModal.value;

        if (!openModal.value) {
            form.reset();
        }
    };

    const onEditEvent = () => {
        onViewInfoEvent();
        openModal.value = !openModal.value;

        form.title = infoSelectedEvent.value.title;
        form.description = infoSelectedEvent.value.description;
        form.date = new Date(infoSelectedEvent.value.start);
        form.dateHours = [
            new Date(infoSelectedEvent.value.start).toLocaleTimeString("es-ES"),
            new Date(infoSelectedEvent.value.end).toLocaleTimeString("es-ES"),
        ];
        form.division = infoSelectedEvent.value.division;
        form.isArRequired =
            infoSelectedEvent.value.isArRequired === "1" ? true : false;
        form.typeService = infoSelectedEvent.value.typeService;
        form.participantsNecesary =
            infoSelectedEvent.value.participantsNecesary;
        form.participantsOptional =
            infoSelectedEvent.value.participantsOptional || [];
        form.resource = infoSelectedEvent.value.resource;
    };

    const onSaveEvent = () => {
        if (!validateFormCalendar({ ...form.data() })) {
            return;
        }

        if (infoSelectedEvent.value.id) {
            onSaveUpdateEvent();
        } else {
            onSaveCreateEvent();
        }
    };

    const onSaveUpdateEvent = async () => {
        try {
            if (!validateFormCalendar({ ...form.data() })) {
                return;
            }

            const response = await axios.put(
                route("calendarPage.update", infoSelectedEvent.value.id),
                {
                    title: form.title,
                    description: form.description,
                    starting_date: formatDateSelect(
                        form.date,
                        form.dateHours[0]
                    ),
                    ending_date: formatDateSelect(form.date, form.dateHours[1]),
                    participants_necesary: form.participantsNecesary.join(","),
                    participants_optional: form.participantsOptional.join(","),
                    resource: form.resource.join(","),
                    division: form.division,
                    isVRRequired: form.isArRequired,
                    type_service_ID: form.typeService,
                    backgroundColor: getRandomColor(),
                    calendar_status: true,
                    uid_user: props.auth.user.guid,
                }
            );

            if (response.data.ok) {
                calendarOptions.value.events = calendarOptions.value.events.map(
                    (event) => {
                        if (event.id === Number(infoSelectedEvent.value.id)) {
                            return {
                                ...event,
                                title: form.title,
                                description: form.description,
                                start: formatDateSelect(
                                    form.date,
                                    form.dateHours[0]
                                ),
                                end: formatDateSelect(
                                    form.date,
                                    form.dateHours[1]
                                ),
                                participantsNecesary: form.participantsNecesary,
                                participantsOptional: form.participantsOptional,
                                resource: form.resource,
                                division: form.division,
                                isArRequired: form.isArRequired,
                                typeService: form.typeService,
                            };
                        }

                        return event;
                    }
                );

                form.reset();
                openModal.value = false;
                openShowInfo.value = false;
                infoSelectedEvent.value = {};

                Swal.fire({
                    icon: "success",
                    title: "Evento actualizado",
                    text: "El evento se ha actualizado correctamente",
                });
            } else {
                console.log(response);

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo actualizar el evento",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error al actualizar el evento, intente de nuevo",
            });
        }
    };

    const formatDateSelect = (date, hours) => {
        const dateSelect = new Date(date);

        const hoursSplit = hours.split(":");

        if (hoursSplit[1] === "30") {
            dateSelect.setHours(Number(hoursSplit[0]), 30);
        } else {
            dateSelect.setHours(Number(hoursSplit[0]), 0);
        }

        return dateSelect;
    };

    const prepareEventData = (form, props) => {
        return {
            title: form.title,
            description: form.description,
            starting_date: formatDateSelect(form.date, form.dateHours[0]),
            ending_date: formatDateSelect(form.date, form.dateHours[1]),
            participants_necesary: form.participantsNecesary.join(","),
            participants_optional: form.participantsOptional.join(",") || "",
            resource: form.resource.join(","),
            division: form.division,
            isVRRequired: form.isArRequired,
            type_service_ID: form.typeService,
            backgroundColor: getRandomColor(),
            calendar_status: true,
            uid_user: props.auth.user.guid,
        };
    };

    const addEventToCalendar = (eventData, form) => {
        calendarOptions.value.events = [
            ...calendarOptions.value.events,
            {
                id: eventData.ID,
                title: form.title,
                description: form.description,
                start: formatDateSelect(form.date, form.dateHours[0]),
                end: formatDateSelect(form.date, form.dateHours[1]),
                participantsNecesary: form.participantsNecesary,
                participantsOptional: form.participantsOptional,
                resource: form.resource,
                backgroundColor: getRandomColor(),
                division: form.division,
                isArRequired: form.isArRequired,
                typeService: form.typeService,
            },
        ];
    };

    const onSaveCreateEvent = async () => {
        try {
            const eventData = prepareEventData(form, props);
            console.log(eventData);

            const response = await axios.post(
                route("calendarPage.create"),
                eventData
            );

            if (response.data.ok) {
                addEventToCalendar(response.data.data, form);

                form.reset();
                openModal.value = false;

                Swal.fire({
                    icon: "success",
                    title: "Evento creado",
                    text: "El evento se ha creado correctamente",
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error al crear el evento",
            });
        }
    };

    const onDeleteEvent = async () => {
        try {

            openShowInfo.value = false;            

            const responseSwal = await Swal.fire({
                title: "Estas seguro que quieres eliminar este evento?",
                showDenyButton: true,
                confirmButtonText: "Eliminar",
                denyButtonText: `Cancelar`,
            });

            if (responseSwal.isConfirmed) {
                const response = await axios.delete(route("calendarPage.delete", infoSelectedEvent.value.id));
                
                if (response.data.ok) {
                    events.value = events.value.filter(
                        (event) => event.id !== Number(infoSelectedEvent.value.id)
                    );

                    Swal.fire({
                        icon: "success",
                        title: "Evento eliminado",
                        text: "El evento se ha eliminado correctamente",
                    });

                    infoSelectedEvent.value = {};
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se pudo eliminar el evento",
                    });
                }
            } 
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ha ocurrido un error al eliminar el evento",
            });
        }
    };

    const getAllEvents = async () => {
        try {
            isLoadingData.value = true;

            const response = await axios.get(route("calendarPage.index"));

            events.value = response.data.data.map((event) => {
                return {
                    id: event.ID,
                    title: event.title,
                    description: event.description,
                    start: event.starting_date,
                    end: event.ending_date,
                    participantsNecesary:
                        event.participants_necesary.split(","),
                    participantsOptional:
                        event.participants_optional?.split(","),
                    resource: event.resource.split(","),
                    division: event.division,
                    isArRequired: event.isVRRequired,
                    typeService: event.type_services,
                    backgroundColor: event.backgroundColor,
                    uidUser: event.uid_user,
                };
            });
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingData.value = false;
        }
    };

    onMounted(() => {
        getAllEvents();
    });

    return {
        openModal,
        openShowInfo,
        infoSelectedEvent,
        form,
        calendarOptions,
        openModalHours,
        events,
        isLoadingData,
        onCreateEvent,
        onSaveEvent,
        onViewInfoEvent,
        onEditEvent,
        handleOpenModalHours,
        onDeleteEvent
    };
};
