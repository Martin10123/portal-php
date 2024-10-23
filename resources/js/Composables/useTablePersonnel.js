import Swal from "sweetalert2";
import { onMounted, ref, watch } from "vue";
import { useDataGrafosStore } from "@/pinia/useDataStore";

export const useTablePersonnel = ({ props }) => {
    const dataGrafos = useDataGrafosStore();
    const showModalForm = ref(false);
    const projectsWithEditing = ref([]);
    const selectedProject = ref([]);
    const showOnlyOne = ref(false);
    const checkAllProjects = ref(false);

    const pagination = ref(1);
    const itemsPerPage = 10;

    const paginatedProjects = ref([]);

    const onChangePage = (page) => {
        pagination.value = page;
        updatePaginatedProjects();
    };

    const updatePaginatedProjects = () => {
        pagination.value = Math.max(
            1,
            Math.min(
                pagination.value,
                Math.ceil(projectsWithEditing.value.length / itemsPerPage)
            )
        );

        const start = (pagination.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        paginatedProjects.value = projectsWithEditing.value.slice(start, end);
    };

    watch(
        () => props.projectSelect,
        (newProjects) => {
            projectsWithEditing.value = newProjects.map((project) => ({
                ...project,
                selected: false,
            }));

            updatePaginatedProjects();
        },
        { immediate: true }
    );

    const onCheckAllProjects = (event) => {
        showOnlyOne.value = false;

        checkAllProjects.value = event.target.checked;

        projectsWithEditing.value.forEach((project) => {
            project.selected = event.target.checked;
        });
    };

    const onCheckProject = (project) => {
        showOnlyOne.value = false;
        checkAllProjects.value = false;

        projectsWithEditing.value.forEach((p) => {
            if (p.Id === project.Id) {
                p.selected = !p.selected;
            }
        });
    };

    const startEditing = () => {
        selectedProject.value = projectsWithEditing.value.filter(
            (project) => project.selected
        );

        if (selectedProject.value.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se ha seleccionado ningún proyecto para editar",
            });
            return;
        }

        if (selectedProject.value.length > 1) {
            showModalForm.value = true;
        } else {
            showOnlyOne.value = true;
        }
    };

    const onCancelEdit = (id) => {
        projectsWithEditing.value.forEach((p) => {
            if (p.Id === id) {
                p.selected = false;
            }
        });

        selectedProject.value = [];
        showOnlyOne.value = false;
    };

    const onUpdateProjectSelected = (project) => {
        const { Id, Bloque, Estado, Grafo_OP, SWBS, Fase, Operación_Proceso } =
            project;

        projectsWithEditing.value = projectsWithEditing.value.map((p) =>
            p.Id === Id
                ? {
                      ...p,
                      Bloque,
                      Estado: Estado ? "Activo" : "Inactivo",
                      Grafo_OP,
                      SWBS,
                      Fase,
                      selected: false,
                      Operación_Proceso,
                  }
                : p
        );

        checkAllProjects.value = false;
        showModalForm.value = false;
        updatePaginatedProjects();
    };

    const handleModalForm = () => {
        showModalForm.value = !showModalForm.value;
    };

    const getAllInfoPersonnel = async () => {
        try {
            dataGrafos.getAllInfoPersonnel();
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        getAllInfoPersonnel();
    });

    return {
        showModalForm,
        selectedProject,
        dataGrafos,
        showOnlyOne,
        pagination,
        paginatedProjects,
        checkAllProjects,
        onCancelEdit,
        onCheckAllProjects,
        onCheckProject,
        startEditing,
        handleModalForm,
        onUpdateProjectSelected,
        onChangePage,
    };
};
