<template>
    <Modal :show="openAddFloorModal" @close="toggleAddFloorModal">
        <h1>Add Floor</h1>
    </Modal>
</template>

<script setup>
import Modal from '../Modal.vue';

defineProps({
    openAddFloorModal: Boolean,
    toggleAddFloorModal: Function
});

</script>
