<script setup>
defineProps({
    value: String,
    class: String,
});
</script>

<template>
    <label class="block font-medium text-sm text-gray-700" :class="class">
        <span v-if="value">{{ value }}</span>
        <span v-else>
            <slot />
        </span>
    </label>
</template>
