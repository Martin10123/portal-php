<template>
    <div>
        <TextInput v-model="searchText" @input="handleInput" placeholder="Buscar..." />

        <ul v-if="showDropdown">
            <li v-for="item in filteredItems" :key="item.id" @click="selectItem(item)">
                {{ item.name }}
            </li>
        </ul>
        <div>
            <p>Elementos seleccionados:</p>
            <ul>
                <li v-for="selectedItem in selectedItems" :key="selectedItem.id">
                    {{ selectedItem.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TextInput from './TextInput.vue';

const searchText = ref('');
const items = ref([
    { id: 1, name: 'Elemento 1' },
    { id: 2, name: 'Elemento 2' },
    { id: 3, name: 'Elemento 3' },
    // Agrega más elementos aquí
]);
const showDropdown = ref(false);
const selectedItems = ref([]);

const filteredItems = computed(() => {
    return items.value.filter(item => item.name.toLowerCase().includes(searchText.value.toLowerCase()));
});

const handleInput = () => {
    showDropdown.value = true;
};

const selectItem = (item) => {
    selectedItems.value.push(item);
    searchText.value = '';
    showDropdown.value = false;
};
</script>
