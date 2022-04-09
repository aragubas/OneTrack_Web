<script setup lang="ts">
import { computed } from "@vue/runtime-core";
import { PatternMatrix, MatrixPosition } from "../SongData";

function getTrackNumber(number: number): string {
  return number.toString().padStart(2, "0");
}
</script>

<template>
  <div class="container">
    <ol>
      <li v-for="line in PatternMatrix" :key="line.Position">
        <span class="line-number">{{ getTrackNumber(line.Position) }}</span>

        <div class="lines">
          <p v-for="pattern in line.Pattern" :key="pattern.ID">
            {{ pattern.Pattern }}
          </p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.pointer {
}
.container {
  display: flex;
  background: var(--panels-color);
  height: 3.5rem;
  width: 20rem;
}

ol {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}

li {
  display: flex;
  gap: 0.5rem;
  background: var(--track-line-background);
  padding: 0 0.2rem;
}

.lines {
  display: flex;
  gap: 0.2rem;
}

.line-number {
  color: var(--line-number-color);
}
</style>
