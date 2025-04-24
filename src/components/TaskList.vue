<template>
  <div class="task-list">
    <!-- Form Tambah Task -->
    <form @submit.prevent="addTask">
      <input v-model="newTask.title" placeholder="Judul task" />
      <button type="submit">Tambah</button>
    </form>

    <!-- Daftar Task -->
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="deleteTask(task.id)">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const API_URL = "https://task-tracker-worker.dhannizd2.workers.dev/";
const tasks = ref([]);
const newTask = ref({ title: "" });

// Read
const fetchTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  tasks.value = await res.json();
};

// Create
const addTask = async () => {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask.value),
  });
  newTask.value.title = "";
  fetchTasks();
};

// Delete
const deleteTask = async (id) => {
  await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
};

onMounted(() => fetchTasks());
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
}
</style>
