<script setup lang="ts">
import { Playing } from "../EditorState";
</script>

<template>
  <nav>
    <ul>
      <li>
        <p>{{ Playing ? "Playing" : "Stopped" }}</p>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  height: 1rem;
  padding: 0 0.5rem;
  background: var(--background-secondary);
}
</style>
