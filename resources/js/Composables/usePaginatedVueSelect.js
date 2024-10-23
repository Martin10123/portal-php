import { ref, computed } from "vue";

export function usePaginatedSelect(options, limit = 10) {
    const search = ref("");
    const offset = ref(0);

    const filtered = computed(() => {
        return options.filter(
            (option) =>
                option.correo
                    .toLocaleLowerCase()
                    .includes(search.value.toLocaleLowerCase()) ||
                option.nombre
                    .toLocaleLowerCase()
                    .includes(search.value.toLocaleLowerCase()) ||
                option.usuario
                    .toLocaleLowerCase()
                    .includes(search.value.toLocaleLowerCase())
        );
    });

    const paginated = computed(() => {
        return filtered.value.slice(offset.value, limit + offset.value);
    });

    const hasNextPage = computed(() => {
        const nextOffset = offset.value + limit;
        return filtered.value.slice(nextOffset, limit + nextOffset).length > 0;
    });

    const hasPrevPage = computed(() => {
        return offset.value > 0;
    });

    const nextPage = () => {
        if (hasNextPage.value) {
            offset.value += limit;
        }
    };

    const prevPage = () => {
        if (hasPrevPage.value) {
            offset.value -= limit;
        }
    };

    const onSearch = (query) => {
        search.value = query;
        offset.value = 0;
    };

    return {
        paginated,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        onSearch,
    };
}
