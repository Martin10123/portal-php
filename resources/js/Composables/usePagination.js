import { ref, computed } from "vue";

export const usePagination = (items, itemsPerPage = 10) => {
    const currentPage = ref(0);
    const rowsPerPage = ref(itemsPerPage);

    const paginatedDeliverables = computed(() => {
        const start = currentPage.value * rowsPerPage.value;
        const end = start + rowsPerPage.value;

        return items.value.slice(start, end);
    });

    const onPageChange = (event) => {
        currentPage.value = event.page;
        rowsPerPage.value = event.rows;
    };

    return { paginatedDeliverables, onPageChange, currentPage, rowsPerPage };
};
