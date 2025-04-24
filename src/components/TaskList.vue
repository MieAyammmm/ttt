<template>
  <div class="task-list">
    <!-- Form Tambah Task -->
    <form @submit.prevent="addTask" class="task-form">
      <input
        v-model="newTask.title"
        placeholder="Masukkan task baru..."
        required
      />
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Menambahkan..." : "Tambah" }}
      </button>
    </form>

    <!-- Daftar Task -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <ul v-if="tasks.length > 0" class="task-items">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <span>{{ task.title }}</span>
        <div class="task-actions">
          <button @click="toggleEdit(task)" class="edit-btn">✏️</button>
          <button @click="deleteTask(task.id)" class="delete-btn">🗑️</button>
        </div>

        <!-- Form Edit (Muncul saat mode edit) -->
        <form
          v-if="task.id === editingTaskId"
          @submit.prevent="updateTask(task)"
          class="edit-form"
        >
          <input v-model="editingTaskTitle" required />
          <button type="submit">Simpan</button>
        </form>
      </li>
    </ul>

    <p v-else class="empty-state">Belum ada task. Yuk tambahkan!</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Ganti dengan URL Worker Hono Anda
const API_URL = "https://task-tracker-worker.dhannizd2.workers.dev/";

// State
const tasks = ref([]);
const newTask = ref({ title: "" });
const error = ref(null);
const isLoading = ref(false);
const editingTaskId = ref(null);
const editingTaskTitle = ref("");

// Fetch semua task
const fetchTasks = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error("Gagal mengambil data");
    tasks.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Tambah task
const addTask = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask.value),
    });

    if (!response.ok) throw new Error("Gagal menambahkan task");

    newTask.value.title = "";
    await fetchTasks();
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};

// Persiapkan edit task
const toggleEdit = (task) => {
  editingTaskId.value = task.id;
  editingTaskTitle.value = task.title;
};

// Update task
const updateTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTaskTitle.value }),
    });

    if (!response.ok) throw new Error("Gagal mengupdate task");

    editingTaskId.value = null;
    await fetchTasks();
  } catch (err) {
    error.value = err.message;
  }
};

// Hapus task
const deleteTask = async (id) => {
  if (!confirm("Yakin hapus task ini?")) return;

  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Gagal menghapus task");

    await fetchTasks();
  } catch (err) {
    error.value = err.message;
  }
};

// Load data awal
onMounted(() => fetchTasks());
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.task-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.task-form input {
  flex-grow: 1;
  padding: 8px;
}

.task-items {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.task-actions {
  display: flex;
  gap: 5px;
}

.edit-form {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.error-message {
  color: red;
  margin-bottom: 10px;
}

.empty-state {
  color: #666;
  text-align: center;
}

button {
  cursor: pointer;
  padding: 5px 10px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-btn {
  color: red;
}
</style>
