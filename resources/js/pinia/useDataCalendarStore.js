import { add, format } from "date-fns";
import { defineStore } from "pinia";

export const useDataCalendarStore = defineStore("dataCalendar", {
    state: () => ({
        eventsCalendar: [],
        error: null,
    }),
    actions: {
        getDayInEnglishAndUntilDate(date, isSerial) {
            if (isSerial === "0") {
                return;
            }

            const dayAbbreviation = format(date, "EE").toLowerCase();

            const oneMonthLater = add(date, { months: 1 });

            return [dayAbbreviation, oneMonthLater];
        },
        getEventDuration(start, end) {
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
        },

        getDataEvent(event) {
            const repeatEventWeekly = this.getDayInEnglishAndUntilDate(
                new Date(event.starting_date),
                event.IsSerial
            );

            const durationEvent = this.getEventDuration(
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
        },
        async getAllEvents() {
            try {
                const response = await axios.get(route("calendarPage.index"));

                this.eventsCalendar = response.data.data.map((event) => {
                    return this.getDataEvent(event);
                });
            } catch (error) {
                console.log(error);
                this.error = error;
            }
        },
        async getEventsByFloors(floors) {
            if (floors.length === 0) {
                this.getAllEvents();
                return;
            }

            try {
                const response = await axios.get(
                    route("calendarPage.getEventsFiltersByFloor", {
                        floors,
                    })
                );

                this.eventsCalendar = response.data.data.map((event) => {
                    return this.getDataEvent(event);
                });

                console.log(this.eventsCalendar);
            } catch (error) {
                console.log(error);
                this.error = error;
            }
        },
    },
});
