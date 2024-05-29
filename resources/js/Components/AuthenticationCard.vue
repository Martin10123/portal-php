<template>
     <div class="p-5 min-h-screen flex flex-col justify-center sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100
        bg-gradient-to-br from-blue-200 to-gray-200bg-gradient-to-br from-white-100 to-gray-200">
        <div>
            <slot name="logo" />
        </div>

        <div class="w-full rounded-xl sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
