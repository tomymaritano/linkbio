// tailwind.config.js
export default {
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            keyframes: {
                bgShift: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
            animation: {
                bgShift: 'bgShift 20s ease-in-out infinite',
            },
            fontFamily: {
                mplus: ['"M PLUS 1p"', 'sans-serif'],
            },
        },
        colors: {
            lightBg: "#f9f9f9",
            darkBg: "#0D1117",
            lightCard: "#ffffff",
            darkCard: "#1F242C",
            lightText: "#1a1a1a",
            darkText: "#f0f0f0",
        },
    },
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
};