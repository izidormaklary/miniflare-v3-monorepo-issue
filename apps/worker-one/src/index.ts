interface Env {}
export default {
  fetch: async (request: Request, env: Env) => {
    // console.log(await import("cloudflare:sockets"))
    return new Response("Hello from worker one!");
  },
} as ExportedHandler;
