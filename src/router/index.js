// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";

const routes = [
  {
    path: "/tasklist",
    component: TaskList,
    name: "tasks", // Tambahkan nama route
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
