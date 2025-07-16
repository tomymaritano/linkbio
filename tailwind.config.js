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
                heading: ['"M PLUS Rounded 1c"', 'sans-serif'],
                body: ['"Open Sans"', 'sans-serif'],
                mplus: ['"M PLUS 1p"', 'sans-serif'], // Keep for compatibility
            },
        },
        colors: {
            // Keep existing for compatibility
            lightBg: "#f9f9f9",
            darkBg: "#0D1117",
            lightCard: "#ffffff",
            darkCard: "#1F242C",
            lightText: "#1a1a1a",
            darkText: "#f0f0f0",
            // Add indigo accent palette
            accent: {
                50: '#eef2ff',
                100: '#e0e7ff',
                200: '#c7d2fe',
                300: '#a5b4fc',
                400: '#818cf8',
                500: '#6366f1',  // Main indigo accent color
                600: '#4f46e5',
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
            },
        },
    },
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
};