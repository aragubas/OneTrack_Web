<script setup lang="ts">
import PatternMatrix from "./PatternMatrix.vue";
</script>

<template>
  <header>
    <div class="header-controls">
      <nav>
        <ul>
          <li><a href="#">File</a></li>
          <li><a href="#">Edit</a></li>
        </ul>
      </nav>

      <PatternMatrix></PatternMatrix>
    </div>

    <div class="version-container">
      <img src="Logo.png" />
      <p>v1.0</p>
    </div>
  </header>
</template>

<style scoped>
.version-container {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.header-controls {
  display: flex;
  gap: 0.5rem;
}

header {
  display: flex;
  background: linear-gradient(
    90deg,
    var(--panels-color) 30%,
    var(--background-color) 60%
  );
  height: 4rem;
  padding: 0.2rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}

nav {
  display: flex;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column;
  gap: 0.2rem;
}

li {
  display: flex;
}

a {
  background: var(--controls-color);
  text-decoration: none;
  font-size: 0.75rem;
  padding: 0 0.2rem;
  color: var(--foreground-normal);
  border: 1px solid var(--control-border-normal);
}

a:hover {
  color: var(--foreground-active);
  background: var(--control-background-active);
  border: 1px solid var(--control-border-active);
}
</style>
