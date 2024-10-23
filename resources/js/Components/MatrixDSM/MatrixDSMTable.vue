<template>
  <table class="text-base text-gray-500 dark:text-gray-400">
    <thead
      class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
    >
      <tr
        class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        v-for="(row, indexRow) in headerMatrix"
        :key="indexRow"
      >
        <th
          v-for="(cell, indexCol) in row"
          :key="indexCol"
          class="border-2 p-[1px] font-medium text-gray-900 whitespace-nowrap dark:text-white text-[0.6rem] hover:bg-gray-100 dark:hover:bg-gray-800"
          :class="{
            'vertical-text':
              indexRow === 1 || (indexRow === 2 && indexCol === 1),
            'text-center': indexCol !== 2,
          }"
        >
          {{ cell }}
        </th>
      </tr>
    </thead>

    <tbody class="relative z-10">
      <tr
        v-for="(row, indexRow) in bodyMatrix"
        :key="indexRow"
        class="border-b border-gray-200 dark:border-gray-700 bg-white z-10"
      >
        <td
          v-for="(cell, indexCol) in row"
          :key="indexCol"
          class="border-2 p-[1px] font-medium text-gray-900 whitespace-nowrap dark:text-white text-[0.6rem] hover:bg-gray-100 dark:hover:bg-gray-800"
          :class="{
            'bg-gray-300': indexCol === indexRow + 6 && cell === '1',
            'hover:bg-gray-200': indexRow + 3,
            'text-center': indexCol !== 2,
            'bg-gray-100':
              (rowColSelected[0] === indexRow &&
                rowColSelected[1] >= indexCol) ||
              (rowColSelected[0] >= indexRow && rowColSelected[1] === indexCol),
          }"
          @click="onSelectIntersection(cell)"
          @mouseover="onMoveMouseAboveMatrix(indexRow, indexCol)"
          @mouseleave="onLeaveMouseAboveMatrix"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr
        class="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        v-for="(row, indexRow) in footerMatrix"
        :key="indexRow"
      >
        <th
          v-for="(cell, indexCol) in row"
          :key="indexCol"
          class="border-2 p-[1px] font-medium text-gray-900 whitespace-nowrap dark:text-white text-[0.6rem] hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {{ cell }}
        </th>
      </tr>
    </tfoot>
  </table>

  <ModalIntersectionsDependencies
    :show="openModalIntersectionsDependencies"
    :task-selected="taskSelected"
    @close="openModalIntersectionsDependencies = false"
  />
</template>

<script setup>
import { ref } from "vue";
import ModalIntersectionsDependencies from "./ModalIntersectionsDependencies.vue";
import { throttle } from "lodash";

const props = defineProps({
  headerMatrix: Array,
  bodyMatrix: Array,
  footerMatrix: Array,
});

const taskSelected = ref({});
const rowColSelected = ref([]);
const openModalIntersectionsDependencies = ref(false);

const onMoveMouseAboveMatrix = throttle((row, col) => {
  rowColSelected.value = [row, col];
}, 200);

const onLeaveMouseAboveMatrix = () => {
  rowColSelected.value = [];
};

const onSelectIntersection = (cell) => {
  openModalIntersectionsDependencies.value = true;

  taskSelected.value = {
    row: rowColSelected.value[0],
    col: rowColSelected.value[1],
    task: cell,
  };
};
</script>

<style scoped>
.vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  max-height: 12rem;
  white-space: normal;
  overflow: hidden;
  text-align: start !important;
}
</style>
