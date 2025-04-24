<template>
  <div class="app">
    <header>
      <h1>Task Tracker</h1>
      <nav>
        <router-link to="/tasks">Daftar Tugas</router-link>
      </nav>
    </header>

    <main>
      <!-- Router view akan menampilkan TaskList otomatis ketika route /tasks aktif -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

nav {
  margin-top: 1rem;
}

nav a {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

nav a:hover {
  background: #3aa876;
}

main {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}
</style>
