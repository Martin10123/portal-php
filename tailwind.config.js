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
            backgroundColor: {
                "primary-cotecmar": "#023f86",
                "secondary-cotecmar": "yellow",
                "tertiary-cotecmar": "#0071ce",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                scmid995: "995px",
            },
            fontSize: {
                "base-more": "1.1rem",
            },
            inset: {
                "-1000": "-200rem",
                1000: "200rem",
                401: "4.1rem",
            },
            height: {
                "screen-calc-4": "calc(100vh - 4.1rem)",
                "screen-calc-6": "calc(100vh - 6rem)",
                "screen-calc-8": "calc(100vh - 8.3rem)",
            },
            width: {
                100: "32rem",
            },
            gridTemplateColumns: {
                "auto-img": "30% 1fr",
                "01": "20rem 1fr",
            },
            colors: {
                primary: "rgb(var(--primary))",
                "primary-hover": "rgb(var(--primary-hover))",
                "primary-active-color": "rgb(var(--primary-active-color))",

                "primary-50": "rgb(var(--primary-50))",
                "primary-100": "rgb(var(--primary-100))",
                "primary-200": "rgb(var(--primary-200))",
            },
        },
    },

    plugins: [forms, typography],
};
