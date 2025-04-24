export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // Handle CRUD
    if (path.startsWith("/tasks")) {
      if (method === "GET") {
        const tasks = await env.DB.prepare("SELECT * FROM tasks").all();
        return Response.json(tasks.results);
      }
      if (method === "POST") {
        const data = await request.json();
        await env.DB.prepare("INSERT INTO tasks (title) VALUES (?)")
          .bind(data.title)
          .run();
        return new Response("Added", { status: 201 });
      }
      if (method === "DELETE") {
        const id = path.split("/")[2];
        await env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();
        return new Response("Deleted", { status: 200 });
      }
    }
    return new Response("Not found", { status: 404 });
  },
};
