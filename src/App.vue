<template>
  <div class="app">
    <header>
      <h1>Task T</h1>
    </header>
    <router-view></router-view>
    <main>
      <TaskList />
    </main>
  </div>
</template>

<script setup>
import TaskList from "./components/TaskList.vue";
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
