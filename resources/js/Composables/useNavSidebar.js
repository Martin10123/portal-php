import { ref } from "vue";

export const useNavSidebar = () => {
    const openSidebar = ref(false);

    const toggleOpenSidebar = () => {
        openSidebar.value = !openSidebar.value;
    };

    return {
        openSidebar,
        toggleOpenSidebar,
    };
};
