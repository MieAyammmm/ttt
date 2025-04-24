import { createRouter, createWebHistory } from "vue-router";
import TaskList from "../components/TaskList.vue";

const routes = [
  {
    path: "/tasks",
    component: TaskList,
    name: "TaskList",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
