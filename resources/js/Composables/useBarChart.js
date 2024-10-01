import { useForm } from "@inertiajs/vue3";
import { onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import {
    getListMouth,
    getXAtributoArray,
    getYearsFrom2000,
    optionsColumnGraphBar,
    optionsColumnGraphPie,
    optionsColumnGraphPieAct,
    optionsColumnGraphTreeMap,
} from "@/helpers";
import { echartsConfig } from "@/echartsConfig";

echartsConfig();

export const useBarChart = () => {
    const listDivision = ref([]);
    const listYears = ref([]);
    const listMouth = ref([]);
    const listNombresXGerencia = ref([]);
    const listCasoBuque = ref([]);

    const isSearchDivision = ref(false);
    const loadingCharts = ref(false);
    const isLoadingNames = ref(false);
    const isLoadingCasos = ref(false);
    const isDisabledClean = ref(true);

    const optionsColumnGraphB = ref(optionsColumnGraphBar);
    const optionsColumnGraphP = ref(optionsColumnGraphPie);
    const optionsColumnGraphPAct = ref(optionsColumnGraphPieAct);
    const optionsColumnGraphTree = ref(optionsColumnGraphTreeMap);

    const form = useForm({
        division: [],
        persona: [],
        caso: [],
        buque: [],
        mes: [],
        anio: [],
    });

    const getDivision = async () => {
        try {
            const { data } = await axios.get(route("management.getDivision"));

            listDivision.value = data.data;

            if (listDivision.value.length === 1) {
                form.division = listDivision.value;
                fetchPersonas();
            } else {
                form.division = [];
                listNombresXGerencia.value = [];
            }
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

    const onGetCasoBuque = async (search) => {
        if (search.value.length < 3 || form.division.length === 0) {
            listCasoBuque.value = [];
            return;
        }

        try {
            isLoadingCasos.value = true;

            const { data } = await axios.get(
                route("users.consultaCasoBuque", {
                    personas: getXAtributoArray(form.persona, "IdResponsable"),
                    divisiones: getXAtributoArray(form.division, "DivisionID"),
                    search: search.value,
                })
            );

            listCasoBuque.value = data.data;
        } catch (error) {
            console.log(error);
        } finally {
            isLoadingCasos.value = false;
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

            if (response.data.semanasData.length <= 0) {
                showWarning("No hay datos para mostrar en los gráficos");
                return;
            }

            renderDrawChartBar(response.data.semanasData);
            renderDrawChartPie(response.data.concurrenciaFase);
            renderDrawChartPieAct(response.data.concurrenciaAct);
            renderDrawChartTreeMap(response.data.dataSWBSTarea);
        } catch (error) {
            console.error(error);
        } finally {
            loadingCharts.value = false;
        }
    };

    const onCleanForm = () => {
        form.reset();
        listNombresXGerencia.value = [];
        listCasoBuque.value = [];
        optionsColumnGraphB.value.dataset.source = [];
        optionsColumnGraphP.value.series[0].data = [];
        optionsColumnGraphPAct.value.series[0].data = [];
        optionsColumnGraphTree.value.series[0].data = [];
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
                casos:
                    form.caso.length > 0
                        ? getXAtributoArray(form.caso, "Caso")
                        : [],
            })
        );
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

    watch(
        () => form.division,
        (newValue) => {
            if (newValue.length > 0 && !isSearchDivision.value) {
                isSearchDivision.value = true;
            } else {
                isSearchDivision.value = false;
            }
        }
    );

    watch(
        () => form.caso,
        (newValue) => {
            if (newValue.length > 0) {
                form.buque = form.caso;
            } else {
                form.buque = [];
            }
        }
    );

    watch(
        () => form.data(),
        (newValue) => {
            isDisabledClean.value = Object.values(newValue).every(
                (value) => value.length === 0
            );
        }
    );

    const mapDataForBarChart = (semanasData) => {
        return semanasData.map(
            ({ semana, horasDeLaSemana, horasAcumuladas }) => ({
                semana,
                HHSemana: horasDeLaSemana,
                HHAcumulada: horasAcumuladas,
            })
        );
    };

    const mapDataForPieChart = (data, nameKey, valueKey) => {
        return data.map((item) => ({
            value: Number(item[valueKey]),
            name: item[nameKey],
        }));
    };

    const renderDrawChartBar = (semanasData) => {
        try {
            if (!Array.isArray(semanasData))
                throw new Error("Invalid data format for semanasData");

            optionsColumnGraphB.value.dataset.source =
                mapDataForBarChart(semanasData);
        } catch (error) {
            console.error("Error rendering Bar Chart:", error);
        }
    };

    const renderDrawChartPie = (concurrenciaFaseData) => {
        try {
            if (!Array.isArray(concurrenciaFaseData))
                throw new Error("Invalid data format for concurrenciaFaseData");

            optionsColumnGraphP.value.series[0].data = mapDataForPieChart(
                concurrenciaFaseData,
                "Fase",
                "concurrencia"
            );
        } catch (error) {
            console.error("Error rendering concurrenciaFaseData:", error);
        }
    };

    const renderDrawChartPieAct = (concurrenciaActData) => {
        try {
            if (!Array.isArray(concurrenciaActData))
                throw new Error("Invalid data format for concurrenciaActData");

            optionsColumnGraphPAct.value.series[0].data = mapDataForPieChart(
                concurrenciaActData,
                "Actividad",
                "concurrencia"
            );
        } catch (error) {
            console.error(
                "Error rendering Pie Chart for concurrenciaActData:",
                error
            );
        }
    };

    const renderDrawChartTreeMap = (concurrenciaTaskData) => {
        try {
            if (!Array.isArray(concurrenciaTaskData))
                throw new Error("Invalid data format for concurrenciaTaskData");

            optionsColumnGraphTree.value.series[0].data =
                concurrenciaTaskData[1].map((swbs) => ({
                    value: 647772,
                    name: swbs,
                    children: concurrenciaTaskData[0].map((task) =>
                        task.SWBSPadre === swbs
                            ? {
                                  value: Number(task.total),
                                  name: `${task.Tarea}\n${task.total}`,
                                  path: `${swbs}/${task.Tarea}`,
                              }
                            : {}
                    ),
                }));
        } catch (error) {
            console.error(
                "Error rendering Tree Map for concurrenciaTaskData:",
                error
            );
        }
    };

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
        isLoadingCasos,
        isDisabledClean,
        optionsColumnGraphB,
        optionsColumnGraphP,
        optionsColumnGraphPAct,
        optionsColumnGraphTree,
        onGetPersonasXGerencia,
        onViewReport,
        onGetCasoBuque,
        onCleanForm,
    };
};
