<script setup>
import { ref, onMounted } from "vue";

const API_URL = "https://taskteam.pages.dev";
const tasks = ref([]);
const newTask = ref({ title: "" });

// Read
const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  tasks.value = await response.json();
};

// Create
const addTask = async () => {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask.value),
  });
  fetchTasks();
};

onMounted(() => fetchTasks());
</script>
