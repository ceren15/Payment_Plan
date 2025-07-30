/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // darkMode aktifleştirme
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",    // src klasörü
        "./app/**/*.{js,ts,jsx,tsx}",    // app klasörü
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
