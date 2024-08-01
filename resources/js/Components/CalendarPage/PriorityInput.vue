<template>
    <div class="flex items-center ps-4 border border-gray-200 rounded">
        <input :id="id" type="radio" :value="value" name="bordered-radio" :checked="modelValue === value"
            @change="updateValue" class="w-4 h-4 bg-gray-100 border-gray-300" :class="color">
        <label :for="id" class="w-full py-4 ms-2 text-sm font-medium text-gray-900">{{ nameLabel }}</label>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    id: String,
    nameLabel: String,
    value: String,
    color: String,
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>
