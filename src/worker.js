// src/worker.js
import { Hono } from "hono";

const app = new Hono();

// GET: Ambil semua task
app.get("/tasks", async (c) => {
  const tasks = await c.env.DB.prepare("SELECT * FROM tasks").all();
  return c.json(tasks.results);
});

// POST: Tambah task baru
app.post("/tasks", async (c) => {
  const { title } = await c.req.json();
  await c.env.DB.prepare("INSERT INTO tasks (title) VALUES (?)")
    .bind(title)
    .run();
  return c.json({ message: "Task added!" }, 201);
});

// DELETE: Hapus task
app.delete("/tasks/:id", async (c) => {
  const id = c.req.param("id");
  await c.env.DB.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();
  return c.json({ message: "Task deleted" });
});

// Handle CORS
app.use("/*", async (c, next) => {
  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set("Access-Control-Allow-Methods", "GET,POST,DELETE");
  await next();
});

export default app;
