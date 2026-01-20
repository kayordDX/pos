import { defineConfig } from "orval";

export default defineConfig({
	api: {
		input: "./swagger.json",
		output: {
			mode: "tags",
			workspace: "./src/lib/api/generated",
			target: "api.ts",
			client: "svelte-query",
			prettier: true,
			headers: false,
			clean: true,
			override: {
				// aliasCombinedTypes: true,
				fetch: {
					// forceSuccessResponse: true,
					includeHttpResponseReturnType: false,
				},
				mutator: {
					path: "../mutator/customInstance.svelte.ts",
					name: "customInstance",
				},
				query: {
					signal: false,
				},
			},
		},
	},
	// zod: {
	// 	input: "./swagger.json",
	// 	output: {
	// 		mode: "single",
	// 		workspace: "./src/lib/api/generated",
	// 		target: "zod.ts",
	// 		client: "zod",
	// 	},
	// },
});
