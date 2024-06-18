import adapter from "@sveltejs/adapter-static";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$lib: "./src/lib",
		},
		adapter: adapter({
			fallback: "index.html",
		}),
	},
};

export default config;
