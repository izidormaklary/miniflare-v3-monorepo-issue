import { Log, LogLevel, Miniflare } from "miniflare";

const app = async () => {
  const mf = new Miniflare({
    // host: "localhost",
    port: 8787,

    workers: [
      {
        routes: [`*/test`],
        name: "test",
        scriptPath: "./script.mjs",
        modules: true,
        modulesRoot: "./",
        // routes: [`*/worker1`],
      },
      {
        routes: [`*/test2`],
        name: "test-2",
        scriptPath: "./dist/script.mjs",
        modules: true,
        modulesRoot: "./",
        // routes: [`*/worker1`],
      },
    ],

    log: new Log(LogLevel.WARN),
    compatibilityDate: "2024-01-12",
  });

  const res = await mf.dispatchFetch("http://localhost:8787/test");
  console.log(await res.text());

  const res2 = await mf.dispatchFetch("http://localhost:8787/test2");
  console.log(await res2.text());
  
  await mf.dispose();
};
app();
