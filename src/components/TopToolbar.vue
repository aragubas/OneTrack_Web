<script setup lang="ts">
import { Playing } from "../EditorState";
</script>

<template>
  <nav :class="Playing ? 'playing' : ''">
    <ul>
      <li>
        <p>{{ Playing ? "Playing" : "Stopped" }}</p>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  transition: background-color 0.5s linear;
  display: flex;
  align-items: center;
  height: 1rem;
  padding: 0 0.5rem;
  background-color: var(--background-secondary);
}

nav.playing {
  background-color: var(--background-accent);
}
</style>
