<template>
  <header
    class="w-full flex items-center justify-between sticky left-0 top-0 px-2 z-20 bg-white"
  >
    <h1 class="text-3xl font-semibold text-gray-900 dark:text-white">
      Matrix DSM
    </h1>

    <div class="inline-flex rounded-md shadow-sm">
      <div
        aria-current="page"
        class="cursor-pointer px-4 py-2 text-base font-medium text-blue-700 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white"
      >
        Organizar
      </div>
      <div
        class="cursor-pointer px-4 py-2 text-base font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white"
      >
        2
      </div>
      <div
        class="cursor-pointer px-4 py-2 text-base font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white"
      >
        3
      </div>
    </div>

    <div>
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-blue-700 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
        @click="openFile"
      >
        Export
      </button>

      <input
        type="file"
        id="file-export"
        class="hidden"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        @change="handleFileChange"
      />
    </div>
  </header>
</template>

<script setup>
defineProps({
  handleFileChange: Function,
});

const openFile = () => {
  document.getElementById("file-export").click();
};
</script>