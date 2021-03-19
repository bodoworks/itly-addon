import AdmZip from "adm-zip";
import { BuildResult, build } from "esbuild";
import fs from "fs-extra";
import yargs from "yargs";

import { version as PACKAGE_VERSION } from "../package.json";
import manifestJson from "../public/manifest.json";

const OUTPUT_FOLDER = "../dist";
export const OUTPUT_ZIP_FILE = `${OUTPUT_FOLDER}/itly-addon-${PACKAGE_VERSION}.zip`;

const args = yargs(process.argv)
    .option("production", {
        type: "boolean",
        description: "Build in production mode",
    })
    .option("watch", {
        type: "boolean",
        description: "Watch mode",
    }).argv;

// clean folder
fs.emptyDirSync(OUTPUT_FOLDER);

// copy over assets
fs.copySync("./public", OUTPUT_FOLDER);

manifestJson.version = PACKAGE_VERSION;
fs.writeFileSync(
    `${OUTPUT_FOLDER}/manifest.json`,
    JSON.stringify(manifestJson, null, 2)
);

const mode = args.production ? "production" : "development";
const IS_PROD = mode === "production";

async function buildEntryPoint(
    entryPoint: string,
    outfile: string
): Promise<BuildResult> {
    return build({
        bundle: true,
        define: {
            "process.env.NODE_ENV": JSON.stringify(mode),
            VERSION: JSON.stringify(PACKAGE_VERSION),
        },
        entryPoints: [entryPoint],
        inject: ["src/react-shim.ts"],
        loader: {
            ".ts": "ts",
        },
        minify: IS_PROD,
        outfile: `${OUTPUT_FOLDER}/${outfile}`,
        publicPath: "/",
        sourcemap: true,
        target: "es2020",
        watch: args.watch,
    });
}

(async (): Promise<void> => {
    const entryPoints = {
        background: "./src/views/background/index.ts",
        content: "./src/views/content/index.tsx",
        "dev-panel": "./src/views/dev-panel/index.tsx",
        "dev-tools": "./src/views/dev-tools/index.ts",
        options: "./src/views/options/index.tsx",
    };

    const builds = Promise.all(
        Object.entries(entryPoints).map(([bundleName, entryPoint]) => {
            return buildEntryPoint(entryPoint, `bundle_${bundleName}.js`);
        })
    );

    await builds;

    const zip = new AdmZip();
    zip.addLocalFolder(OUTPUT_FOLDER);
    zip.writeZip(OUTPUT_ZIP_FILE);
})();
