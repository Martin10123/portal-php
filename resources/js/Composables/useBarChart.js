import { useForm } from "@inertiajs/vue3";
import { onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import { useReports } from "./useReports";

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

    function drawChart() {
        const data = google.visualization.arrayToDataTable([
            [
                "Semana - Año",
                "HH semanal",
                "HH acumulada",
                { role: "annotation" },
            ],
            ["w31-2024", 0, 0, 0],
            ["w32-2024", 0, 0, 0],
            ["w33-2024", 0, 0, 0],
            ["w34-2024", 0, 0, 0],
            ["w35-2024", 0, 0, 0],
        ]);

        const options = {
            chart: {
                title: "hh semana, hh acumulada",
                subtitle: "Horas semanales y acumuladas",
            },
            backgroundColor: {
                fill: "transparent",
            },
        };

        const chart = new google.charts.Bar(
            document.getElementById("chartColumn")
        );

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    function drawChart1() {
        const data = google.visualization.arrayToDataTable([
            ["Task", "Hours per Day"],
            ["", 1],
        ]);

        const options = {
            title: "Fase",
            backgroundColor: {
                fill: "transparent",
            },
            is3D: true,
        };

        const chart = new google.visualization.PieChart(
            document.getElementById("piechart")
        );

        chart.draw(data, options);
    }

    function drawChart2() {
        const data = google.visualization.arrayToDataTable([
            ["Task", ""],
            ["", 1],
        ]);

        const options = {
            title: "Act",
            backgroundColor: {
                fill: "transparent",
            },
            is3D: true,
        };

        const chart = new google.visualization.PieChart(
            document.getElementById("piechartAct")
        );

        chart.draw(data, options);
    }

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

    const getXAtributoArray = (array, atributte) => {
        if (array.length === 0) {
            return [];
        }

        return array.map((p) => p[atributte]);
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

    const renderCharts = (data) => {
        const { semanasData, concurrenciaFase, concurrenciaAct } = data;

        renderBarChart(semanasData);
        renderPieChart(concurrenciaFase, "Fase", "piechart");
        renderPieChart(concurrenciaAct, "Act", "piechartAct");
    };

    const renderBarChart = (semanasData) => {
        const filasSemanas = semanasData.map((semana) => [
            semana.semana,
            Math.round(Number(semana.horasDeLaSemana)),
            Math.round(Number(semana.horasAcumuladas)),
        ]);

        const data = google.visualization.arrayToDataTable([
            ["Semana - Año", "HH semanal", "HH acumulada"],
            ...filasSemanas,
        ]);

        // Número de semanas (columnas) que tienes
        const numColumns = data.getNumberOfRows();

        // Calcula el ancho dinámico: 100px por cada columna
        const chartWidth = numColumns * 100;

        // Aplica el nuevo ancho dinámico al div del gráfico
        document.getElementById("chartColumn").style.width = chartWidth + "px";

        const options = {
            chart: {
                title: "HH semanal, HH acumulada",
                subtitle: "Horas semanales y acumuladas",
            },
            backgroundColor: { fill: "transparent" },
            hAxis: {
                textStyle: {
                    fontSize: 10, // Ajusta el tamaño de las etiquetas
                },
                slantedText: true, // Inclina el texto para mayor legibilidad
            },
            vAxis: {
                viewWindow: {
                    min: 0,
                    max: Math.max(...data.getDistinctValues(1)) * 1.2, // Ajustar el máximo del eje para dar espacio
                },
                title: "Horas",
            },
        };

        const chart = new google.charts.Bar(
            document.getElementById("chartColumn")
        );
        chart.draw(data, google.charts.Bar.convertOptions(options));
    };

    const renderPieChart = (data, title, elementId) => {
        const filas = data.map((item) => [
            item.Fase || item.Actividad,
            Math.round(Number(item.concurrencia)),
        ]);

        const dataTable = google.visualization.arrayToDataTable([
            [title, "Concurrencia"],
            ...filas,
        ]);

        const options = {
            title: title,
            backgroundColor: { fill: "transparent" },
            is3D: true,
        };

        const chart = new google.visualization.PieChart(
            document.getElementById(elementId)
        );
        chart.draw(dataTable, options);
    };

    function getYearsFrom2000() {
        const currentYear = new Date().getFullYear();
        const years = [];

        for (let year = currentYear; year >= 2019; year--) {
            years.push(year);
        }
        return years;
    }

    function getListMouth() {
        return [
            { value: "1", name: "Enero" },
            { value: "2", name: "Febrero" },
            { value: "3", name: "Marzo" },
            { value: "4", name: "Abril" },
            { value: "5", name: "Mayo" },
            { value: "6", name: "Junio" },
            { value: "7", name: "Julio" },
            { value: "8", name: "Agosto" },
            { value: "9", name: "Septiembre" },
            { value: "10", name: "Octubre" },
            { value: "11", name: "Noviembre" },
            { value: "12", name: "Diciembre" },
        ];
    }

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

    onMounted(() => {
        google.charts.load("current", { packages: ["bar"] });
        google.charts.setOnLoadCallback(drawChart);

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart1);

        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart2);
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
        onViewReport,
        openSidebar,
        toggleOpenSidebar,
        onGetPersonasXGerencia,
    };
};
