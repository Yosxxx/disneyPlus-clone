/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    // enable dark mode via a `.dark` class on your root view
    darkMode: "class",
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                dark: {
                    100: "#1b1e27",
                    200: "#222327",
                    300: "#0f1013",
                },
            },
        },
    },
    plugins: [],
};
