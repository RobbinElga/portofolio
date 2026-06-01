import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "midnight-abyss": "#05060f",
                comet: "#d8ecf8",
                "arctic-mist": "#d1e4fa",
                "whisper-blue": "#9da7ba",
                "neon-violet": "#663af3",
                "celestial-light": "#b6d9fc",
                "ghost-white": "#f8f9fa",
                "interstellar-gray": "#81899b",
                "azure-glow": "#c7d3ea",
                "subtle-border": "rgba(186, 215, 247, 0.12)",
            },
            fontFamily: {
                "space-grotesk": "var(--font-space-grotesk)",
                inter: "var(--font-inter)",
            },
            backgroundColor: {
                "card-bg": "rgba(186, 214, 247, 0.03)",
            },
            borderColor: {
                "subtle-border": "rgba(186, 215, 247, 0.12)",
            },
        },
    },
    plugins: [],
};

export default config;
