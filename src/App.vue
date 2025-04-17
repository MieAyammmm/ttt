<script setup>
import { ref, onMounted } from "vue";

const tasks = ref([]);

async function fetchTasks() {
  const response = await fetch(
    "https://task-tracker-worker.dhannizd2.workers.dev/api/tasks"
  );
  tasks.value = await response.json();
}

onMounted(() => fetchTasks());
</script>

<template>
  <h1>Task Tracker Tim</h1>
  <div v-for="task in tasks" :key="task.id">
    {{ task.title }} (Assigned to: {{ task.assigned_to }})
  </div>
</template>
