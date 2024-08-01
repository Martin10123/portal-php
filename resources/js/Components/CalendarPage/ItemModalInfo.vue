<template>
    <li class="grid gap-2 border-b p-3">
        <div class="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" :d="svgd" />
            </svg>

            <h2>{{ title }}</h2>
        </div>

        <p class="pl-9">{{ info }}</p>
    </li>
</template>

<script setup>

defineProps({
    title: String,
    info: String,
    svgd: String
})
</script>