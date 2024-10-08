<template>
    <div class="grid gap-2">
        <label class="font-medium">{{ label }}</label>
        <v-select class="dark:bg-gray-700 rounded-md" :options="paginated" :placeholder="placeholder" @search="onSearch"
            multiple append-to-body :calculate-position="calcSpacing" label="correo" v-model="localValue">
            <template v-slot:option="option">
                <div>
                    {{ option.correo }}
                    <br />
                    <cite class="text-sm">{{ option.nombre }}</cite>
                </div>
            </template>
            <template #list-footer>
                <li class="flex justify-between items-center p-2 flex-grow">
                    <button class="bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 rounded-md px-2 py-1
                    " :disabled="!hasPrevPage" @click="prevPage">Prev</button>
                    <button class="bg-stone-300 text-stone-800 hover:bg-stone-400 hover:text-stone-900 rounded-md px-2 py-1
                    " :disabled="!hasNextPage" @click="nextPage">Next</button>
                </li>
            </template>
        </v-select>
    </div>
</template>

<script setup>
import { usePaginatedSelect } from '@/Composables/usePaginatedVueSelect';
import { createPopper } from '@popperjs/core';
import { ref, watch, defineEmits } from 'vue';

const props = defineProps({
    modelValue: Array | String,
    label: String,
    options: Array,
    placeholder: String,
});

const { paginated, hasPrevPage, hasNextPage, prevPage, nextPage, onSearch } =
    usePaginatedSelect(props.options, 10);

const emit = defineEmits();

const localValue = ref(props.modelValue);
const emailsBefore = [...props.modelValue];

watch(localValue, (newValue) => {

    const selectedEmails = newValue.map((email) => email.correo);

    const newEmails = [...emailsBefore, ...selectedEmails].filter((email) => email)

    emit('update:modelValue', newEmails);
});

const calcSpacing = (dropdownList, component, { width }) => {
    dropdownList.style.width = width;

    const popper = createPopper(component.$refs.toggle, dropdownList, {
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, -1],
                },
            },
            {
                name: "toggleClass",
                enabled: true,
                phase: "write",
                fn({ state }) {
                    component.$el.classList.toggle(
                        "drop-up",
                        state.placement === "top"
                    );
                },
            },
        ],
    });

    return () => popper.destroy();
};

</script>