import { usePage } from "@inertiajs/vue3";
import axios from "axios";
import Swal from "sweetalert2";
import { ref, watch, onMounted } from "vue";

export const useProjectCase = ({ form }) => {
    const { props } = usePage();

    const projects = ref([]);
    const usersEmails = ref([]);
    const tipoServicios = ref([]);
    const servicioSolicitado = ref([]);
    const listPlanta = ref([]);
    const userActive = ref(props.auth.user);

    const getProjects = async () => {
        try {
            const { data } = await axios.get(route("get.projects"));

            projects.value = data.projects;

            listPlanta.value = data.dataPlanta.filter(
                (planta) => planta.Planta !== null
            );
        } catch (error) {
            console.log("Error en getProjects: ", error);
        }
    };

    const getEmailsUsers = async () => {
        try {
            const { data } = await axios.get(route("get.users"));

            usersEmails.value = data;
        } catch (error) {
            console.log("Error en getEmailsUsers: ", error);
        }
    };

    const getTipoServicios = async () => {
        try {
            const { data } = await axios.get(route("get.tipoServicios"));

            tipoServicios.value = data;
        } catch (error) {
            console.log("Error en getTipoServicios: ", error);
        }
    };

    const onSelectProject = async (project) => {
        if (project === null) {
            return;
        }

        try {
            const { data } = await axios.post(route("post.project.select"), {
                Buque: project.buque,
                Caso: project.caso,
            });

            form.caso = project.caso;
            form.proceso = data.proceso ? Number(data.proceso) + 1 : "";

            form.tipoBuque = data.tipoBuque ? data.tipoBuque : "";
            form.planta = data.planta ? data.planta : "";
            form.clienteExterno = data.clienteExterno
                ? data.clienteExterno
                : "";
        } catch (error) {
            console.error("Error en: onSelectProject:", error);
        }
    };

    const onCreateProject = async (project) => {
        Swal.fire({
            title: "Nuevo proyecto",
            text: "Ingrese los datos del nuevo proyecto",
            icon: "info",
        });

        const { data } = await axios.get(route("get.consecutive", "Regular"));

        form.caso = Number(data[0].consecutivo) + 1;
        form.proceso = 1;
    };

    watch(
        () => form.buque,
        (project) => {
            if (project === null) {
                form.caso = "";
                form.proceso = "";
                form.tipoBuque = "";
                form.planta = "";
                form.clienteExterno = "";

                return;
            }

            if (project.buque) {
                onSelectProject(project);
            } else {
                onCreateProject(project);
            }
        }
    );

    const onSelectTipoServicio = async (tipoServicio) => {
        if (tipoServicio === null || tipoServicio === "") {
            return;
        }

        try {
            const { data } = await axios.post(route("post.getTipoServicio"), {
                idTservicio: tipoServicio,
            });

            servicioSolicitado.value = data;
        } catch (error) {
            console.error("Error en: onSelectTipoServicio:", error);
        }
    };

    watch(
        () => form.tipoServicio,
        (tipoServicio) => {
            if (tipoServicio === "") {
                servicioSolicitado.value = [];
                return;
            }
            onSelectTipoServicio(tipoServicio.id);
        }
    );

    onMounted(() => {
        getProjects();
        getEmailsUsers();
        getTipoServicios();

        if (form.tipoServicio && form.tipoServicio !== "") {
            onSelectTipoServicio(form.tipoServicio.id);
        }
    });

    return {
        projects,
        usersEmails,
        tipoServicios,
        servicioSolicitado,
        listPlanta,
        userActive,
    };
};
