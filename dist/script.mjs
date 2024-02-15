export default {
    async fetch(request, env, ctx) {
      const { connect } = await import("cloudflare:sockets");
      return new Response("Hello, world!");
    },
  };
  