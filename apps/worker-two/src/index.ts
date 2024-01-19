interface Env {}
export default {
  fetch: async (request: Request, env: Env) => {
    const { throwError } = await import("./dynamic-error");
    throwError();
    return new Response("Suspicious hello from worker two");
  },
} as ExportedHandler;
