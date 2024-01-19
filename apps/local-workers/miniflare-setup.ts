import { Log, LogLevel, Miniflare, WorkerOptions } from "miniflare";
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);

// Maps worker name to route prefix
const namesAndRoutes = {
  "worker-one": "worker1",
  "worker-two": "worker2",
  "bound-worker": "bound",
};

// console.log("[Local Workers] Using tunnel", localDbTunnelHostname);

const mounts: WorkerOptions[] = [];

for (const [workerName, workerRoutePrefix] of Object.entries(namesAndRoutes)) {
  const packageName = `${workerName}`;
  const packageDistPath = path.resolve(
    require.resolve(`${packageName}/src/index.ts`),
    "../../dist/index.mjs"
  );
  const scriptPath = path.relative(".", packageDistPath);
  mounts.push({
    // modulesRoot: path.resolve(__dirname, "../" ),
    // rootPath: packageDistPath,
    name: workerName,
    script: await readFile(scriptPath, "utf-8"),
    // scriptPath: "./index.mjs",
    compatibilityFlags: ["nodejs_compat"],
    routes: [`*/${workerRoutePrefix}`],
    // routes: [`${workerRoutePrefix}/*`],
    modules: true,
    // modulesRules: [{ type: "CompiledWasm", include: ["**/*.wasm"] }],
    durableObjects:
      workerName === "bound-worker"
        ? {
            BINDING: { className: "Binsing" },
          }
        : undefined,
    cache: true,

    // cachePersist: path.resolve(__dirname, ".mf/cache"),
    // kvPersist: path.resolve(__dirname, ".mf/kv"),
    compatibilityDate: "2023-12-18",
    // globals: {
    //   _local_createGlobalKnexClient: createLambdaKnexClient,
    //   _local_getDbConnectionString: () => dbConnectionString,
    //   _local_getPostgresClient: () => postgresNode(dbConnectionString),
    //   performance: performance,
    // },
  });
}

mounts.push({
  name: "fallback",
  modules: true,
  routes: [`*/*`],
  script: `
const fallbackWorker = {
  async fetch(request, env, ctx) {
   
    return new Response("Hello from fallback worker");
  },
};

export default fallbackWorker;`,
});
const app = async () => {
  const mf = new Miniflare({
    host: "0.0.0.0",
    port: parseInt(process.env.PORT as string) || 3002,
    workers: mounts,
    log: new Log(LogLevel.WARN),
    compatibilityDate: "2023-02-28",
  });

  console.log(
    `[Local Workers] Workers are listening on port ${ 
      parseInt(process.env.PORT as string) ||   3002}.`
  );
};
app();
