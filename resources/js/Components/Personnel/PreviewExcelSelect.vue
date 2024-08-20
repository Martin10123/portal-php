<template>
    <Modal :show="showAddExcelBD" @handleModal="handleModalExcelDB">
        <template #header>
            <h2 class="text-lg font-semibold">Vista previa del excel seleccionado</h2>
        </template>
    </Modal>
</template>

<script setup>
import Modal from '../Modal.vue';


</script>