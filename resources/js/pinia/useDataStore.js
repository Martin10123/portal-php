import { defineStore } from "pinia";
import axios, { Axios } from "axios";
import Swal from "sweetalert2";

export const useDataGrafosStore = defineStore("dataGrafos", {
    state: () => ({
        allStage: [],
        allSWBS: [],
        allOperation: [],
        projects: [],
        activities: [],
        currentPage: 1,
        itemsPerPage: 10,
        loadingFile: false,
        file: null,
        error: null, // Para manejar errores
    }),
    actions: {
        async getAllInfoPersonnel() {
            // Evita recargar si los datos ya están en el store
            if (
                this.allStage.length &&
                this.allSWBS.length &&
                this.allOperation.length
            ) {
                return;
            }

            this.loadingFile = true;
            this.error = null; // Resetea el error antes de la petición
            try {
                const [
                    stageResponse,
                    swbsResponse,
                    operationResponse,
                    activitiesResponse,
                ] = await Promise.all([
                    axios.get(route("reports.stagePersonnel")),
                    axios.get(route("reports.swbsPersonnel")),
                    axios.get(route("reports.operationsPersonnel")),
                    axios.get(route("reports.getActivities")),
                ]);

                this.allStage = stageResponse.data;
                this.allSWBS = swbsResponse.data;
                this.allOperation = operationResponse.data;
                this.activities = activitiesResponse.data.data;
            } catch (error) {
                this.error = error; // Guarda el error en el estado
                console.error(
                    "Error al obtener información del personal:",
                    error
                );
                Swal.fire({
                    icon: "error",
                    title: "Error al obtener información de los swbs, etapas y operaciones",
                    text: "Por favor, recarga la página",
                });
            } finally {
                this.loadingFile = false;
            }
        },
        async getAllProjects() {
            if (this.projects.length) {
                return;
            }

            try {
                const response = await axios.get(route("reports.index"));

                this.projects = response.data;
            } catch (error) {
                console.error("Error al obtener los proyectos:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error al obtener los proyectos",
                    text: "Por favor, recarga la página",
                });
            }
        },
    },
});
