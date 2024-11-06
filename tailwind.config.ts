import type { Config } from "tailwindcss";
import { kayordPlugin } from "@kayord/tw-plugin";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/@kayord/ui/**/*.{html,js,svelte,ts}"],
	theme: {},
	plugins: [kayordPlugin, tailwindcssAnimate],
} satisfies Config;
