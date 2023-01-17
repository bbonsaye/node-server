import { defineConfig } from "vitest/config";
import { verbose } from "winston";

export default defineConfig({
	test: {
		reporters: "verbose",
		globals: true,
		coverage: {
			reporter: ["text", "html"],
		},
	},
});
