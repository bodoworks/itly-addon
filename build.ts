import AdmZip from "adm-zip";
import { BuildResult, build } from "esbuild";
import fs from "fs-extra";
import yargs from "yargs";

import { version as PACKAGE_VERSION } from "./package.json";
import manifestJson from "./public/manifest.json";

const args = yargs(process.argv)
    .option("production", {
        type: "boolean",
        description: "Build in production mode",
    })
    .option("watch", {
        type: "boolean",
        description: "Watch mode",
    }).argv;

const mode = args.production ? "production" : "development";

// clean folder
fs.emptyDirSync("./dist");

// copy over assets
fs.copySync("./public", "./dist");

manifestJson.version = PACKAGE_VERSION;
fs.writeFileSync("./dist/manifest.json", JSON.stringify(manifestJson, null, 2));

const ENV = JSON.stringify(mode);
const IS_PROD = mode === "production";

async function buildEntryPoint(
    entryPoint: string,
    outfile: string
): Promise<BuildResult> {
    return build({
        bundle: true,
        define: {
            "process.env.NODE_ENV": ENV,
            VERSION: JSON.stringify(PACKAGE_VERSION),
        },
        entryPoints: [entryPoint],
        inject: ["src/react-shim.ts"],
        loader: {
            ".ts": "ts",
        },
        minify: IS_PROD, // only minify prod so that JSX doesn't get obfuscated when using react profiler
        outfile: `./dist/${outfile}`,
        plugins: [],
        publicPath: "/",
        sourcemap: true,
        target: "es2020",
        watch: args.watch,
    });
}

(async (): Promise<void> => {
    const entryPoints = {
        background: "./src/views/background/index.ts",
        content: "./src/views/content/index.ts",
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

    const zipFilename = `./dist/itly-addon-${PACKAGE_VERSION}.zip`;
    const zip = new AdmZip();
    zip.addLocalFolder("./dist");
    zip.writeZip(zipFilename);
})();
