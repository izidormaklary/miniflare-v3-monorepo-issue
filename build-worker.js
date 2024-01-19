/* eslint-disable no-undef */
import { build } from "esbuild";

const watch = process.argv.includes("--watch");

try {
  await build({
    bundle: true,
    write: true,
    sourcemap: true,
    format: "esm",
    target: "es2020",
    conditions: ["worker", "browser"],
    entryPoints: ["src/index.ts"],
    external:["cloudflare:sockets"],
    outdir: "dist",
    resolveExtensions: [".mts", ".mjs", ".ts", ".js", ".json"],
    outExtension: { ".js": ".mjs" },
    treeShaking: true,
    metafile: true,
  }).then(() => {
    if (watch) {
      console.log(`Build Succesful. Watch Mode ON - 👀 `);
    }
  });
} catch (e) {
  console.error(e);
  process.exitCode = 1;
}
