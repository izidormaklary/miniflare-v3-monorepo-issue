export { Binding } from "./binding";
export default {
  fetch: (
    request: Request,
    { BINDING }: { BINDING: DurableObjectNamespace }
  ) => {
    const id = BINDING.idFromName(request.url);
    const stub = BINDING.get(id);
    if (!stub) return new Response("No stub found");
    return stub.fetch(request);
  },
} as ExportedHandler;
