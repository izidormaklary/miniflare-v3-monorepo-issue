interface Env {}
export default {
  fetch: (request: Request, env: Env) => {
    throw new Error("Error from worker one");
  },
} as ExportedHandler;
