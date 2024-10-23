<template>
  <Modal :show="show" @close="onClose">
    <div class="p-4">
      <h2 class="text-lg font-semibold">
        Tarea seleccionada de la fila: {{ taskSelected.row }} y columna:
        {{ taskSelected.col }}
      </h2>
      <p class="text-sm text-gray-500">
        Selecciona una intersección para ver sus dependencias
      </p>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "../Modal.vue";

defineProps({
  show: Boolean,
  onClose: Function,
  taskSelected: Object,
});
</script>