import { defineStore } from "pinia";

export const useGetEmailsStore = defineStore("usersEmails", {
    state: () => ({
        usersEmails: [],
        isLoading: false,
    }),
    actions: {
        async fetchUsersEmails() {
            try {
                this.isLoading = true;

                const response = await axios.get(route("users.index"));

                this.usersEmails = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
