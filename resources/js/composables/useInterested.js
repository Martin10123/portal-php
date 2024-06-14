import { getAllHolidays } from "@/Data/getHolidays";
import axios from "axios";
import { onMounted, computed, ref } from "vue";

export const useInterested = ({ form }) => {
    const disabledDatesHolidays = computed(() => {
        const daysToAdd = Number(form.servicioSolicitado.trespuesta);

        return getAllHolidays(daysToAdd);
    });

    const disabledTipoCopia = computed(() => {
        if (
            form.servicioSolicitado.NombreTipo != "Copias de Planos o Escaner"
        ) {
            form.tipoCopia = "";
            return true;
        } else {
            return false;
        }
    });

    const validIfOptionsContainSomeWordWithPlano = computed(() => {
        if (
            form.servicioSolicitado.NombreTipo === "Copias de Planos o Escaner"
        ) {
            return;
        }

        return form.servicioSolicitado.NombreTipo?.toLowerCase().includes(
            "plano"
        );
    });

    const validIfOptionsContainSomeWordWithCostos = computed(() => {
        return form.servicioSolicitado.NombreTipo?.includes("Costos");
    });

    const getConsecutivoECDB = async () => {
        try {
            if (!form.servicioSolicitado.NombreTipo.includes("Estimación")) {
                return;
            }

            const { data } = await axios.get(
                route("get.consecutive", "Estimaciones")
            );

            form.consecutivoEC = data[0].consecutivo;
        } catch (error) {
            console.log(error);
        }
    };

    const getFiles = (e) => {
        const files = e.target.files;

        let totalSize = 0;

        for (let i = 0; i < files.length; i++) {
            totalSize += files[i].size;
        }

        if (totalSize > 15728640) {
            alert("El tamaño total de los archivos no puede superar los 15mb");
            return;
        }

        form.files = files;
    };

    const getFileById = (id) => {
        window.location = route("file.download", { id });
    };

    onMounted(() => {
        if (validIfOptionsContainSomeWordWithCostos.value) {
            getConsecutivoECDB();
        }
    });

    return {
        disabledDatesHolidays,
        disabledTipoCopia,
        validIfOptionsContainSomeWordWithPlano,
        validIfOptionsContainSomeWordWithCostos,
        getFiles,
        getFileById,
    };
};
