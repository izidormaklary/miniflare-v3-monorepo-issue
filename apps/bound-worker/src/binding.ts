export class Binding {
  state: DurableObjectState;
  constructor(state: DurableObjectState, env: any) {
    this.state = state;
  }

  async fetch(request: Request): Promise<Response> {
    throw new Error("Not implemented");
    return new Response("Hello World From Binding");
  }
}
