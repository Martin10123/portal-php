import axios from "axios";
import { ref, watch, onMounted } from "vue";

export const useProjectCase = ({ form }) => {
    const projects = ref([]);
    const usersEmails = ref([]);
    const tipoServicios = ref([]);
    const servicioSolicitado = ref([]);
    const listPlanta = ref([]);

    const getProjects = async () => {
        try {
            const { data } = await axios.get(route("get.projects"));

            projects.value = data.map((project) => ({
                buque: project.buque,
                caso: project.caso,
                casoBuque: `${project.caso} - ${project.buque}`,
            }));

            const plantasSet = new Set(data.map((project) => project.planta));

            listPlanta.value = Array.from(plantasSet).filter(
                (planta) => planta !== null
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

    watch(
        () => form.buque,
        (project) => {
            onSelectProject(project);
        }
    );

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

            form.tipoBuque = data.tipoBuque ? data.tipoBuque : "";
            form.planta = data.planta ? data.planta : "";
            form.clienteExterno = data.clienteExterno
                ? data.clienteExterno
                : "";
        } catch (error) {
            console.error("Error en: onSelectProject:", error);
        }
    };

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
    });

    return {
        projects,
        usersEmails,
        tipoServicios,
        servicioSolicitado,
        listPlanta,
    };
};
