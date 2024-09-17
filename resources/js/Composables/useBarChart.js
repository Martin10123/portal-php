import { useForm } from "@inertiajs/vue3";
import { onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import { useReports } from "./useReports";
import {
    getListMouth,
    getXAtributoArray,
    getYearsFrom2000,
} from "@/helpers/BarChartHelper";
import { initECharts } from "@/echartsConfig";

initECharts();

export const useBarChart = () => {
    const { openSidebar, toggleOpenSidebar } = useReports();
    const listDivision = ref([]);
    const listYears = ref([]);
    const listMouth = ref([]);
    const listNombresXGerencia = ref([]);
    const listCasoBuque = ref([]);

    const isSearchDivision = ref(false);
    const loadingCharts = ref(false);
    const isLoadingNames = ref(false);

    const form = useForm({
        division: "",
        persona: "",
        caso: "",
        buque: "",
        mes: "",
        anio: "",
    });

    const getDivision = async () => {
        try {
            const { data } = await axios.get(route("management.getDivision"));

            listDivision.value = data.data;
        } catch (error) {
            console.log(error);
        }
    };

    const onGetPersonasXGerencia = async () => {
        try {
            isLoadingNames.value = true;

            const divisiones = getXAtributoArray(form.division, "DivisionName");

            const { data } = await axios.get(
                route("users.consultaUsuariosXGerencia", {
                    divisiones,
                })
            );

            listNombresXGerencia.value = data.usuarios;
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingNames.value = false;
            isSearchDivision.value = false;
        }
    };

    const onViewReport = async () => {
        listNombresXGerencia.value = [];

        if (!isFormValid(form)) {
            showWarning("Debes seleccionar un año o una división");
            return;
        }

        prepareDivisions(form);

        if (shouldFetchPersonas(form, listNombresXGerencia.value)) {
            await fetchPersonas();
        } else {
            form.division = listDivision.value;
            await fetchPersonas();
        }

        setDefaultValues(form);

        if (listNombresXGerencia.value.length === 0) {
            showWarning("No hay personas en la división seleccionada");
            return;
        }

        loadingCharts.value = true;

        try {
            const response = await fetchChartData(form);

            if (!response.data.ok) {
                showWarning("No hay datos para la persona seleccionada");
                return;
            }

            renderCharts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            loadingCharts.value = false;
        }
    };

    const isFormValid = (form) => {
        return form.anio.length > 0 || form.division.length > 0;
    };

    const showWarning = (message) => {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: message,
        });
    };

    const prepareDivisions = (form) => {
        if (form.persona.length > 0) {
            form.division = form.persona.map((p) => ({
                DivisionID: p.DivisionID,
                DivisionName: p.DivisionName,
            }));
        }
    };

    const shouldFetchPersonas = (form, listNombresXGerencia) => {
        return listNombresXGerencia.length === 0 && form.division.length > 0;
    };

    const fetchPersonas = async () => {
        await onGetPersonasXGerencia();
    };

    const setDefaultValues = (form) => {
        if (form.mes.length === 0) {
            form.mes = listMouth.value;
        }
        if (form.anio.length === 0) {
            form.anio = listYears.value;
        }
    };

    const fetchChartData = (form) => {
        return axios.get(
            route("users.consultaDatosSegunPersonaSeleccionada", {
                personas:
                    form.persona.length > 0
                        ? getXAtributoArray(form.persona, "IdResponsable")
                        : getXAtributoArray(
                              listNombresXGerencia.value,
                              "IdResponsable"
                          ),
                anios: [...form.anio],
                meses: getXAtributoArray(form.mes, "value"),
            })
        );
    };

    watch(
        () => form.division,
        async (newValue) => {
            if (newValue.length > 0) {
                isSearchDivision.value = true;
            } else {
                isSearchDivision.value = false;
            }
        }
    );

    const optionsColumnGraph = ref({
        legend: {},
        tooltip: {},
        dataset: {
            dimensions: ["product", "2015", "2016", "2017"], // Define las dimensiones
            source: [
                { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
                { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
                { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
                {
                    product: "Walnut Brownie",
                    2015: 72.4,
                    2016: 53.9,
                    2017: 39.1,
                },
            ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
            { type: "bar", name: "2015", encode: { x: "product", y: "2015" } },
            { type: "bar", name: "2016", encode: { x: "product", y: "2016" } },
            { type: "bar", name: "2017", encode: { x: "product", y: "2017" } },
        ],
    });

    onMounted(() => {
        getDivision();

        listYears.value = getYearsFrom2000();
        listMouth.value = getListMouth();
    });

    return {
        form,
        listDivision,
        listYears,
        listMouth,
        listNombresXGerencia,
        listCasoBuque,
        isSearchDivision,
        loadingCharts,
        isLoadingNames,
        openSidebar,
        optionsColumnGraph,
        onGetPersonasXGerencia,
        onViewReport,
        toggleOpenSidebar,
    };
};
