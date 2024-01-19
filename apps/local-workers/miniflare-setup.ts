import { Log, LogLevel, Miniflare } from "miniflare";

const app = async () => {
  const mf = new Miniflare({
    host: "0.0.0.0",
    port: parseInt(process.env.PORT as string) || 3002,
    workers: [
      {
        name: "worker-one",
        scriptPath: "../worker-one/dist/index.mjs",
        modules: true,
        // routes: [`*/worker1`],
      },
    ],
    log: new Log(LogLevel.WARN),
    compatibilityDate: "2023-02-28",
  });

  console.log(
    `[Local Workers] Workers are listening on port ${
      parseInt(process.env.PORT as string) || 3002
    }.`
  );
};
app();
