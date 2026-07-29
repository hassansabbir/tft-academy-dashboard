import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        base: "var(--color-base)",
        sidebarBg: "var(--color-sidebar-bg)",
        sidebarText: "var(--color-sidebar-text)",
        mainBg: "var(--color-main-bg)",
        mainText: "var(--color-main-text)",
        cardBg: "var(--color-card-bg)",
      },
    },
  },
  plugins: [],
};
