import { getAllHolidays } from "@/Data/getHolidays";
import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import { onMounted, computed, ref } from "vue";

export const useInterested = ({ form }) => {
    const { props } = usePage();

    const userActive = ref(props.auth.user);
    const disabledDatesHolidays = computed(() => {
        return getAllHolidays();
    });

    const disabledTipoCopia = computed(() => {
        return form.servicioSolicitado != "Copias de Planos o Escaner";
    });

    const startDateByTrespuesta = computed(() => {
        return new Date(
            new Date().setDate(
                new Date().getDate() +
                    Number(form.servicioSolicitado.trespuesta)
            )
        );
    });

    const validIfOptionsContainSomeWordWithPlano = computed(() => {
        return form.servicioSolicitado.includes("Plano");
    });

    const validIfOptionsContainSomeWordWithCostos = computed(() => {
        return form.servicioSolicitado.includes("Costos");
    });

    const getConsecutivoECDB = async () => {
        try {
            if (form.tipoRegistro === "Operativo") {
                form.tipoRegistro = "Regular";
            }

            const { data } = await axios.get(
                route("get.consecutive", form.tipoRegistro)
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
    };

    onMounted(() => {
        if (validIfOptionsContainSomeWordWithCostos.value) {
            getConsecutivoECDB();
        }
    });

    return {
        userActive,
        disabledDatesHolidays,
        disabledTipoCopia,
        startDateByTrespuesta,
        validIfOptionsContainSomeWordWithPlano,
        validIfOptionsContainSomeWordWithCostos,
        getFiles,
    };
};
