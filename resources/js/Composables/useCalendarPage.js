import { useForm, usePage } from "@inertiajs/vue3";
import { onMounted, ref, watch } from "vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
import rrulePlugin from "@fullcalendar/rrule";
import Swal from "sweetalert2";

import { validateFormCalendar } from "@/Validations/validCalendarModal";
import { getAllHolidays } from "@/Data/getHolidays";
import { add, format, parse, setHours, setMinutes } from "date-fns";

export const useCalendarPage = () => {
    const openModal = ref(false);
    const openShowInfo = ref(false);
    const openModalHours = ref(false);
    const openFilterByPlaces = ref(false);
    const infoSelectedEvent = ref({});

    const isLoadingData = ref(false);
    const isLoadingSaveEvent = ref(false);
    const events = ref([]);

    const { props } = usePage();

    const form = useForm({
        title: "",
        description: "",
        floor: "",
        date: "",
        division: "***",
        isArRequired: false,
        repeatPeriodically: false,
        typeService: "",
        dateHours: [],
        participantsNecesary: [],
        participantsOptional: [],
        resource: [],
    });

    const holidays = getAllHolidays().map(
        (date) => date.toISOString().split("T")[0]
    );

    const getIconSVG = (condition, path) => {
        return condition
            ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width:1.1rem; height:1.1rem">
                 <path stroke-linecap="round" stroke-linejoin="round" d="${path}" />
               </svg>`
            : "";
    };

    const handleEventContent = ({ event }) => {
        const { extendedProps, title, start, end } = event;
        const { isRepeatPeriod, resource = [] } = extendedProps;

        const getIcons = () => {
            const repeatIcon = getIconSVG(
                isRepeatPeriod === "1" || isRepeatPeriod === true,
                "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            );

            const singleIcon = getIconSVG(
                (isRepeatPeriod === "0" || isRepeatPeriod === false) &&
                    resource.length === 0,
                "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
            );

            const resourceIcon = getIconSVG(
                resource.length > 0,
                "m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            );

            return `${singleIcon}${repeatIcon}${resourceIcon}`;
        };

        return {
            html: `
                <div class="fc-event-main-frame overflow-hidden" title="${title}">
                    <div class="fc-event-time">
                        ${getHourTime(start)} - ${getHourTime(end)}
                    </div>
                    <div class="fc-event-title-container">
                        <div class="fc-event-title fc-sticky">
                            ${title}
                        </div>
                    </div>
                    <div class="flex gap-1 justify-end px-1 absolute bottom-0 right-0">
                        ${getIcons()}
                    </div>
                </div>
            `,
        };
    };

    const calendarOptions = ref({
        plugins: [
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
            rrulePlugin,
        ],
        initialView: "timeGridWeek",
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        selectable: true,
        slotEventOverlap: false,
        events: events,
        weekends: false,
        height: "100%",
        locale: esLocale,
        eventClick: handleEventClick,
        select: handleSelectEvent,
        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
            startTime: "07:00",
            endTime: "16:30",
        },
        datesSet: highlightHolidays,
        eventContent: handleEventContent,
    });

    const getHourTime = (date) => {
        return new Date(date).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Función para manejar la visualización de la información de un evento
    function handleEventClick(info) {
        onViewInfoEvent(false);

        infoSelectedEvent.value = extractEventDetails(info);
    }

    // Extrae los detalles de un evento
    function extractEventDetails(info) {
        return {
            id: info.event.id,
            floor: info.event.extendedProps.floor,
            title: info.event.title,
            description: info.event.extendedProps.description,
            start: info.event.start,
            end: info.event.end,
            participantsNecesary: info.event.extendedProps.participantsNecesary,
            participantsOptional: info.event.extendedProps.participantsOptional,
            resource: info.event.extendedProps.resource,
            division: info.event.extendedProps.division,
            isArRequired: info.event.extendedProps.isArRequired,
            typeService: info.event.extendedProps.typeService,
            uidUser: info.event.extendedProps.uidUser,
            isRepeatPeriod: info.event.extendedProps.isRepeatPeriod,
        };
    }

    // Función para manejar la selección de un evento
    function handleSelectEvent(info) {
        if (
            !isValidTimeRange(info.startStr, info.endStr) &&
            info.view.type !== "dayGridMonth"
        ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pueden crear eventos fuera del horario laboral o en horas pasadas",
            });
            return;
        }

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
    }

    const isAdminOrBoss =
        props.auth.user.IsAdmin === "1" ||
        props.auth.user.IsJefe === "1" ||
        props.auth.user.IdResponsable === "20258";

    // Valida si la hora seleccionada está dentro del horario laboral y no en el pasado
    function isValidTimeRange(startStr, endStr) {
        const start = new Date(startStr);
        const end = new Date(endStr);
        const now = new Date();

        if (!isAdminOrBoss) {
            // Verificar que la hora seleccionada no sea en el pasado
            if (start < now) return false;
        }

        // Verificar que la hora esté dentro del horario laboral
        return isWithinBusinessHours(start) && isWithinBusinessHours(end);
    }

    // Resalta los días festivos en el calendario
    function highlightHolidays() {
        holidays.forEach((holiday) => {
            const cell = document.querySelector(`td[data-date="${holiday}"]`);
            if (cell) {
                cell.classList.add("fc-nonbusiness");
            }
        });
    }

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

    const handleOpenFilterByPlaces = () => {
        openFilterByPlaces.value = !openFilterByPlaces.value;
    };

    const onViewInfoEvent = (isEdit) => {
        openShowInfo.value = !openShowInfo.value;

        if (!openShowInfo.value && !isEdit) {
            infoSelectedEvent.value = {};
        }
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
        onViewInfoEvent(true);
        openModal.value = !openModal.value;

        const {
            floor,
            title,
            description,
            start,
            end,
            division,
            isArRequired,
            typeService,
            participantsNecesary,
            participantsOptional = [],
            resource,
            isRepeatPeriod,
        } = infoSelectedEvent.value;

        const formatTime = (date) => new Date(date).toLocaleTimeString("es-ES");

        form.floor = {
            id: floor,
            name: floor,
            bgColor: floor === "Laboratorio XRLAB" ? "#0099ff" : "#808080",
            selected: false,
        };
        form.title = title;
        form.description = description;
        form.date = new Date(start);
        form.dateHours = [formatTime(start), formatTime(end)];
        form.division = division;
        form.isArRequired = isArRequired === "1" || isArRequired === true;
        form.typeService = typeService;
        form.participantsNecesary = participantsNecesary;
        form.participantsOptional = participantsOptional;
        form.resource = resource;
        form.repeatPeriodically =
            isRepeatPeriod === "1" || isRepeatPeriod === true;
    };

    const onSaveEvent = (e) => {
        e.preventDefault();

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

            const { value: text, isConfirmed } = await Swal.fire({
                input: "textarea",
                inputLabel: "Razón de la modificación",
                inputPlaceholder: "Escribe la razón...",
                inputAttributes: {
                    "aria-label": "Escribe la razón",
                },
                confirmButtonText: "Actualizar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
            });

            if (!isConfirmed) {
                return;
            }

            if (text.length <= 10) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: "Por favor escriba una razón más detallada",
                });

                return;
            }

            isLoadingSaveEvent.value = true;

            const response = await axios.put(
                route("calendarPage.update", infoSelectedEvent.value.id),
                {
                    floor: form.floor.name,
                    title: form.title,
                    description: form.description,
                    starting_date: formatDateSelect(
                        form.date,
                        form.dateHours[0]
                    ),
                    ending_date: formatDateSelect(form.date, form.dateHours[1]),
                    participants_necesary: form.participantsNecesary.join("; "),
                    participants_optional:
                        form.participantsOptional?.join("; "),
                    resource: form.resource?.join("; "),
                    division: form.division,
                    isVRRequired: form.isArRequired,
                    type_service_ID: form.typeService,
                    calendar_status: true,
                    userCreated: props.auth.user,
                    reason: text,
                    isRepeatPeriod: form.repeatPeriodically,
                }
            );

            if (response.data.ok) {
                calendarOptions.value.events = calendarOptions.value.events.map(
                    (event) => {
                        if (event.id === Number(infoSelectedEvent.value.id)) {
                            return {
                                ...event,
                                title: form.title,
                                floor: form.floor.name,
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
                                isRepeatPeriod: form.repeatPeriodically,
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
                text: `Ha ocurrido un error al actualizar el evento, por favor intentelo nuevamente o contacte al administrador, ${error}`,
            });
        } finally {
            isLoadingSaveEvent.value = false;
        }
    };

    const formatDateSelect = (date, hours) => {
        const [hour, minute] = hours.split(":").map(Number);

        const updatedDate = setHours(setMinutes(date, minute), hour);

        const formattedDate = format(updatedDate, "yyyy-MM-dd HH:mm:ss");

        return formattedDate;
    };

    const prepareEventData = (form) => {
        return {
            floor: form.floor.name,
            title: form.title,
            description: form.description,
            starting_date: formatDateSelect(form.date, form.dateHours[0]),
            ending_date: formatDateSelect(form.date, form.dateHours[1]),
            participants_necesary: form.participantsNecesary.join("; "),
            participants_optional: form.participantsOptional.join("; ") || "",
            resource: form.resource.join("; ") || "",
            division: form.division,
            isVRRequired: form.isArRequired,
            type_service_ID: form.typeService,
            calendar_status: true,
            userCreated: props.auth.user,
            isRepeatPeriod: form.repeatPeriodically,
        };
    };

    const addEventToCalendar = (eventData, form) => {
        calendarOptions.value.events = [
            ...calendarOptions.value.events,
            {
                backgroundColor:
                    form.floor === "Laboratorio XRLAB" ? "#0099ff" : "#808080",
                id: eventData.ID,
                floor: form.floor.name,
                title: form.title,
                description: form.description,
                start: formatDateSelect(form.date, form.dateHours[0]),
                end: formatDateSelect(form.date, form.dateHours[1]),
                participantsNecesary: form.participantsNecesary,
                participantsOptional: form.participantsOptional,
                resource: form.resource,
                division: form.division,
                isArRequired: form.isArRequired,
                typeService: form.typeService,
                isRepeatPeriod: form.repeatPeriodically,
            },
        ];
    };

    const onSaveCreateEvent = async () => {
        try {
            isLoadingSaveEvent.value = true;

            const eventData = prepareEventData(form);

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

            if (error.response.status === 409) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                });
                return;
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Ha ocurrido un error al crear el evento, por favor intentelo nuevamente o contacte al administrador, ${error}`,
            });
        } finally {
            isLoadingSaveEvent.value = false;
        }
    };

    const onDeleteEvent = async () => {
        try {
            openShowInfo.value = false;

            const { value: text, isConfirmed } = await Swal.fire({
                input: "textarea",
                inputLabel: "Razón de la eliminación",
                inputPlaceholder: "Escribe la razón...",
                inputAttributes: {
                    "aria-label": "Escribe la razón",
                },
                confirmButtonText: "Eliminar",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
            });

            if (!isConfirmed) {
                return;
            }

            if (text.length <= 10) {
                Swal.fire({
                    icon: "warning",
                    title: "Error",
                    text: "Por favor escriba una razón más detallada",
                });

                return;
            }

            const response = await axios.delete(
                route("calendarPage.delete", {
                    id: infoSelectedEvent.value.id,
                    reason: text,
                })
            );

            if (response.data.ok) {
                calendarOptions.value.events =
                    calendarOptions.value.events.filter(
                        (event) =>
                            event.id !== Number(infoSelectedEvent.value.id)
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
        } catch (error) {
            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Ha ocurrido un error al eliminar el evento, por favor intentelo nuevamente o contacte al administrador, ${error}`,
            });
        }
    };

    const getDayInEnglishAndUntilDate = (date, isSerial) => {
        if (isSerial === "0") {
            return;
        }

        const dayAbbreviation = format(date, "EE").toLowerCase();

        const oneMonthLater = add(date, { months: 1 });

        return [dayAbbreviation, oneMonthLater];
    };

    const getEventDuration = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const duration = (endDate - startDate) / 1000 / 60 / 60;

        if (duration < 1) {
            return "00:30";
        } else if (duration < 1.5) {
            return "01:00";
        } else if (duration < 2) {
            return "01:30";
        } else if (duration < 2.5) {
            return "02:00";
        } else if (duration < 3) {
            return "02:30";
        } else if (duration < 3.5) {
            return "03:00";
        }
    };

    const getDataEvent = (event) => {
        const repeatEventWeekly = getDayInEnglishAndUntilDate(
            new Date(event.starting_date),
            event.IsSerial
        );

        const durationEvent = getEventDuration(
            event.starting_date,
            event.ending_date
        );

        return {
            id: event.ID,
            title: event.title,
            description: event.description,
            start: event.starting_date,
            end: event.ending_date,
            participantsNecesary: event.participants_necesary.split("; "),
            participantsOptional: event.participants_optional?.split("; "),
            resource: event.resource?.split("; "),
            division: event.division,
            isArRequired: event.isVRRequired,
            typeService: event.type_services,
            backgroundColor: event.backgroundColor,
            uidUser: event.uid_user,
            floor: event.sala,
            isRepeatPeriod: event.IsSerial,
            rrule:
                event.IsSerial === "1"
                    ? {
                          freq: "weekly",
                          interval: 1,
                          byweekday: repeatEventWeekly[0],
                          until: repeatEventWeekly[1],
                          dtstart: event.starting_date,
                      }
                    : null,
            duration: event.IsSerial === "1" ? durationEvent : null,
        };
    };

    const getAllEventsCalendar = async () => {
        isLoadingData.value = true;

        try {
            const response = await axios.get(route("calendarPage.index"));

            events.value = response.data.data.map((event) => {
                return getDataEvent(event);
            });
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingData.value = false;
        }
    };

    onMounted(() => {
        getAllEventsCalendar();
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
        isLoadingSaveEvent,
        openFilterByPlaces,
        onCreateEvent,
        onSaveEvent,
        onViewInfoEvent,
        onEditEvent,
        handleOpenModalHours,
        onDeleteEvent,
        handleOpenFilterByPlaces,
    };
};
