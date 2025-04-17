export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/tasks" && request.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM tasks").all();
      return Response.json(results);
    }
    return new Response("Hello from Worker!");
  },
};
