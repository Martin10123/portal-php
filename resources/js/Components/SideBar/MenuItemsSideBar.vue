<template>
    <ul class="px-3 pt-4 grid gap-3 relative">
        <li :class="{ 'text-lg border-b-2 p-3 py-4 shadow-md rounded-lg cursor-pointer hover:bg-slate-100 transition duration-150 ease-in-out scale-100 relative': true, }"
            v-for="{ title, hasSubItems, other, icon } in optionsItemSidebar">
            <span class="flex justify-between items-center" @click="onOpenItems">
                <span class="flex items-center gap-4">
                    <i :class="icon"></i>
                    <span>
                        {{ title }}
                    </span>
                </span>

                <template v-if="hasSubItems">
                    <i class="fa-solid fa-arrow-down"></i>
                </template>
            </span>

            <ul v-if="hasSubItems" :class="{
                'pl-10 pt-3': true, 'transition duration-150 ease-in-out': true, 'hidden': !openItems
            }">
                <li class="py-3 border-b" v-for="{ title, goTo } in other">
                    <Link :href="goTo">
                    {{ title }}
                    </Link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import { optionsItemSidebar } from "@/Data/optionsSideBar.js";

const { openMenu } = defineProps({
    openMenu: Boolean
});

const openItems = ref(false);

const onOpenItems = () => {
    openItems.value = !openItems.value;
};

</script>