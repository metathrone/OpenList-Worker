import { bindings, defineConfig } from "cf/config";

/**
 * Secret-like files were detected but not read or migrated: .dev.vars.example, .env.example. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
	worker: {
		name: "openlist",
		compatibilityDate: "2026-08-04",
		compatibilityFlags: [
			"nodejs_compat",
		],
		entrypoint: "src/backend/worker.ts",
		workersDev: true,
		previewUrls: false,
		assets: {
			runWorkerFirst: [
				"/",
				"/index.html",
			],
		},
		domains: [
			"openlist.rushia.eu.org",
		],
		env: {
			ENVIRONMENT: bindings.text("production"),
			DB_FORMAT: bindings.text("sql"),
			DB_DRIVER: bindings.text("d1"),
			DB_CIPHER: bindings.text("none"),
			CACHE_ENABLED: bindings.text("true"),
			CACHE_DRIVER: bindings.text("db"),
			CACHE_FILE_TREE: bindings.text("true"),
			CACHE_DOWNLOAD_LINK: bindings.text("false"),
			CACHE_TTL: bindings.text("0"),
			CACHE_LINK_TTL: bindings.text("5"),
			CACHE_EXCLUDE_DRIVERS: bindings.text("virtual,alias,url_tree,strm,chunk"),
			SINGLEFLIGHT: bindings.text("auto"),
			DB: bindings.d1({
				name: "openlist-db",
				id: "0b3ade5c-7d07-4c6e-b5e6-ce7db122f478",
			}),
			ASSETS: bindings.assets(),
		},
	},
});
