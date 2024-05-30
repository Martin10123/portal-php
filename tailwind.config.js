import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./vendor/laravel/jetstream/**/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                "base-more": "1.1rem",
            },
            inset: {
                "-1000": "-200rem",
                1000: "200rem",
            },
            height: {
                "screen-calc-6": "calc(100vh - 6rem)",
                "screen-calc-8": "calc(100vh - 8.3rem)",
            },
        },
    },

    plugins: [forms, typography],
};
