interface Env {}
export default {
  fetch: async(request: Request, env: Env) => {
    // console.log(await import("cloudflare:sockets"))
    throw new Error("Error from worker one");
  },
} as ExportedHandler;
