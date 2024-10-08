import { defineStore } from "pinia";

export const useDataCalendarStore = defineStore("dataCalendar", {
    state: () => ({
        allFloorsCalendar: [],
        error: null,
    }),
    actions: {
        async getFloors() {
            try {
                const response = await axios.get(
                    route("calendarPage.getAllFloors")
                );

                this.allFloorsCalendar = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        getFloorSelected(floorSelect) {
            return this.allFloorsCalendar.data.filter(
                (floor) => floor.ID === Number(floorSelect)
            );
        },
    },
});
