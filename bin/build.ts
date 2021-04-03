import AdmZip from "adm-zip";
import { build } from "esbuild";
import fs from "fs-extra";
import yargs from "yargs";

import { version as PACKAGE_VERSION } from "../package.json";
import manifestJson from "../public/manifest.json";

const OUTPUT_FOLDER = "dist";
export const OUTPUT_ZIP_FILE = `${OUTPUT_FOLDER}/itly-addon-${PACKAGE_VERSION}.zip`;

const { argv } = yargs(process.argv)
    .option("production", {
        type: "boolean",
        description: "Build in production mode",
    })
    .option("watch", {
        type: "boolean",
        description: "Watch mode",
    });

// clean folder
fs.emptyDirSync(OUTPUT_FOLDER);

// copy over assets
fs.copySync("./public", OUTPUT_FOLDER);

manifestJson.version = PACKAGE_VERSION;
fs.writeFileSync(
    `${OUTPUT_FOLDER}/manifest.json`,
    JSON.stringify(manifestJson, null, 2)
);

const mode = argv.production ? "production" : "development";
const IS_PROD = mode === "production";

(async (): Promise<void> => {
    const start = Date.now();
    process.stdout.write("Building...");

    await build({
        bundle: true,
        define: {
            "process.env.NODE_ENV": JSON.stringify(mode),
            VERSION: JSON.stringify(PACKAGE_VERSION),
        },
        entryPoints: {
            bundle_background: "./src/views/background/index.ts",
            bundle_content: "./src/views/content/index.tsx",
            "bundle_dev-panel": "./src/views/dev-panel/index.tsx",
            "bundle_dev-tools": "./src/views/dev-tools/index.ts",
            bundle_options: "./src/views/options/index.tsx",
        },
        inject: ["src/react-shim.ts"],
        loader: {
            ".ts": "ts",
        },
        minify: IS_PROD,
        outdir: OUTPUT_FOLDER,
        publicPath: "/",
        sourcemap: true,
        target: "es2020",
        watch: argv.watch && {
            onRebuild(error, result): void {
                if (error) {
                    console.error(`Watch build failed:`, error);
                } else {
                    console.log(`Watch build succeeded:`, result);
                }
            },
        },
    });

    const end = Date.now();
    process.stdout.write(`✅ ${end - start}ms\n`);

    if (!argv.watch) {
        const zip = new AdmZip();
        zip.addLocalFolder(OUTPUT_FOLDER);
        zip.writeZip(OUTPUT_ZIP_FILE);
        console.log(`Built zip: ${OUTPUT_ZIP_FILE}`);
    }
})();
