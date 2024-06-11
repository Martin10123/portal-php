<template>
    <main class="md:flex">
        <SideBarMain />

        <section class="w-full flex justify-center">
            <article class="grid lg:grid-cols-auto-img mx-4 py-4 lg:h-full">
                <div class="w-100 h-full hidden lg:block">
                    <img class="h-full object-cover rounded-s-lg" src="../../Assets/cotecmarImg.jpg"
                        alt="Logo de cotecmar">
                </div>

                <section class="w-full before:w-full before:h-screen rounded-lg shadow-lg md:rounded-e-lg before:bg-slate-200 before:fixed before:top-0 before:-z-10 p-2 before:left-0
                 h-full bg-white overflow-auto">
                    <h1 class="text-2xl text-center p-4 font-black">
                        REGISTRO SOLICITUD DE SERVICIO DE DISEÑO Y/O INGENIERIA
                    </h1>

                    <select class="w-full border border-stone-300 cursor-pointer outline-0 p-4 rounded-lg"
                        v-model="form.tipoRegistro">
                        <option value="Interno">Seleccionar uno</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Operativo">Operativo</option>
                        <option value="PDTI">PDTI</option>
                    </select>

                    <TabsLine :tabs="tabs" />

                    <div class="grid w-full bg-white mt-2 p-4 rounded-lg gap-2">
                        <div class="flex items-center justify-between">
                            <h2 class="text-2xl font-medium mb-4">{{ form.tipoRegistro }}</h2>

                            <h4 v-if="form.caso" class="text-xl">
                                <span class="font-semibold">Número de caso:</span>
                                {{ form.caso }}
                            </h4>
                        </div>

                        <ProjectCase :form="form" v-if="tabs == 1" />

                        <Interested :form="form" v-if="tabs == 2" />

                        <ButtonsAddRequest :tabs="tabs" :nextTab="nextTab" :prevTab="prevTab"
                            :on-submit-form="submitForm" />
                    </div>

                    <div
                        class="size-16 rounded-full shadow-md flex justify-center items-center text-2xl cursor-pointer fixed bottom-2 left-2 bg-blue-700 text-white">
                        <i class="fa-solid fa-question"></i>
                    </div>
                </section>
            </article>
        </section>
    </main>

</template>

<script setup>
import Interested from "@/Components/AddRequest/Interested.vue";
import ProjectCase from "@/Components/AddRequest/ProjectCase.vue";
import ButtonsAddRequest from "@/Components/AddRequest/ButtonsAddRequest.vue";
import TabsLine from "@/Components/AddRequest/TabsLine.vue";
import SideBarMain from "@/Components/SideBar/SideBarMain.vue";
import { ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import Swal from "sweetalert2";

const form = useForm({
    tipoRegistro: 'Operativo',
    buque: '',
    caso: '',
    clienteExterno: '',
    tipoBuque: '',
    planta: '',
    interesado: [],
    solicitante: [],
    grafo: '',
    tipoServicio: '',
    servicioSolicitado: [],
    pendiente: '',
    tipoCopia: '',
    fechaSolucion: '',
    solicitudGenerada: '',
    consecutivoEC: '',
    descripcionServicio: '',
    informacionAdjunta: [],
})

const tabs = ref(1);

const nextTab = (e) => {
    e.preventDefault();

    if (form.buque == '' ||
        form.caso == '' ||
        form.clienteExterno == ''
        || form.tipoBuque == ''
        || form.planta == ''
        || form.interesado.length == 0
        || form.solicitante.length == 0
        || form.tipoServicio < 0 || form.tipoServicio > 5
        || form.servicioSolicitado.length == 0
    ) {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Complete los campos requeridos",
        });

        return;
    }

    tabs.value += 1;
};

const prevTab = (e) => {
    e.preventDefault();
    tabs.value -= 1;
};


const submitForm = () => {
    console.log(form);
}
</script>
