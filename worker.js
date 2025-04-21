export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle CRUD
    if (path === "/tasks") {
      if (method === "GET") {
        const tasks = await env.DB.prepare("SELECT * FROM tasks").all();
        return Response.json(tasks.results);
      }
      if (method === "POST") {
        const data = await request.json();
        await env.DB.prepare("INSERT INTO tasks (title) VALUES (?)")
          .bind(data.title)
          .run();
        return new Response("Task added", { status: 201 });
      }
    }
    return new Response("Not found", { status: 404 });
  },
};
