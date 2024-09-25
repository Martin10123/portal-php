import { onMounted, ref, watch } from "vue";

export const useReports = () => {
    const projectsReport = ref([]);
    const projectSelect = ref([]);
    const stageProjectRef = ref([]);
    const SWBSPersonnel = ref([]);
    const filteredProjects = ref([]);
    const selectedSwbs = ref("");
    const selectedStage = ref("");
    const valueProject = ref(null);

    const fetchReports = async () => {
        try {
            const response = await axios.get(route("reports.index"));

            projectsReport.value = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReportByProject = async (project) => {
        try {
            const formData = new FormData();
            formData.append("Proyecto", project);

            const response = await axios.post(
                route("reports.searchReport"),
                formData
            );

            projectSelect.value = response.data;

            updateUniqueValues({
                data: projectSelect.value,
                varRef: stageProjectRef,
                label: "Fase",
            });

            filterProjects();
        } catch (error) {
            console.error(error);
        }
    };

    const filterProjects = () => {
        filteredProjects.value = projectSelect.value.filter(
            (project) =>
                (!selectedSwbs.value ||
                    project.SWBS.toLowerCase().includes(
                        selectedSwbs.value.toLowerCase()
                    )) &&
                (!selectedStage.value ||
                    project.Fase.toLowerCase().includes(
                        selectedStage.value.toLowerCase()
                    ))
        );
    };

    const updateUniqueValues = ({ data, varRef, label }) => {
        varRef.value = [...new Set(data.map((item) => item[label]))];
    };

    const clearValues = (value) => {
        if (
            selectedSwbs.value === "" &&
            selectedStage.value === "" &&
            !valueProject.value
        ) {
            return;
        }

        if (value === 1) {
            selectedSwbs.value = "";
            selectedStage.value = "";
            valueProject.value = null;
        } else if (value === 2) {
            selectedSwbs.value = "";
            selectedStage.value = "";
        } else if (value === 3) {
            selectedSwbs.value = "";
        }
    };

    watch(valueProject, (newValueProject) => {
        if (newValueProject) {
            fetchReportByProject(newValueProject.Proyecto);
            selectedSwbs.value = "";
            selectedStage.value = "";
        } else {
            projectSelect.value = [];
            filteredProjects.value = [];
            stageProjectRef.value = [];
            SWBSPersonnel.value = [];
            selectedSwbs.value = "";
            selectedStage.value = "";
        }
    });

    watch(selectedStage, () => {
        if (selectedStage.value === "") {
            SWBSPersonnel.value = [];
            selectedSwbs.value = "";
        } else {
            selectedSwbs.value = "";

            updateUniqueValues({
                data: projectSelect.value.filter(
                    (project) =>
                        project.Fase.toLowerCase() ===
                        selectedStage.value.toLowerCase()
                ),
                varRef: SWBSPersonnel,
                label: "SWBS",
            });
        }

        filterProjects();
    });

    watch(selectedSwbs, () => {
        filterProjects();
    });

    onMounted(fetchReports);

    return {
        valueProject,
        projectsReport,
        projectSelect,
        stageProjectRef,
        SWBSPersonnel,
        selectedSwbs,
        selectedStage,
        filteredProjects,
        clearValues,
    };
};
