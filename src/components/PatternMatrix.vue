<script setup lang="ts">
import { computed, onMounted, watch } from "@vue/runtime-core";
import { ref } from "vue";
import { PatternMatrix, MatrixPosition, Channels } from "../SongData";
var SelectedPosition = ref(0);

function getTrackNumber(number: number): string {
  var lineNumber = number.toString().padStart(2, "0");
  var pointer = "/";

  if (number == MatrixPosition.value) {
    pointer = ">";
  }

  return pointer + lineNumber;
}

var patternThis: HTMLElement | null = null;

onMounted(() => {
  patternThis = document.getElementById("pattern-matrix");
});

// Scroll relevant matrix line into view when matrix position changes
watch(MatrixPosition, () => {
  // Scroll element into view
  var el = document.getElementById(
    "patternmatrix-line-" + MatrixPosition.value
  );

  if (el != null) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }
});

function handleKeyboard(event: KeyboardEvent) {
  if (event.key == "ArrowDown") {
    MatrixPosition.value = MatrixPosition.value + 1;

    // Wraps around
    if (MatrixPosition.value > PatternMatrix.value.length - 1) {
      MatrixPosition.value = 0;
    }
  } else if (event.key == "ArrowUp") {
    MatrixPosition.value = MatrixPosition.value - 1;

    // Wraps around
    if (MatrixPosition.value <= -1) {
      MatrixPosition.value = PatternMatrix.value.length - 1;
    }
  } else if (event.key == "ArrowLeft") {
    SelectedPosition.value -= 1;

    if (SelectedPosition.value < 0) {
      SelectedPosition.value = Channels.value - 1;
    }
  } else if (event.key == "ArrowRight") {
    SelectedPosition.value += 1;

    if (SelectedPosition.value > Channels.value - 1) {
      SelectedPosition.value = 0;
    }
  } else {
    // Handle number keys
    if (event.key >= "0" && event.key <= "9") {
      var number = parseInt(event.key);
      if (isNaN(number)) {
        return;
      }

      PatternMatrix.value[MatrixPosition.value].Pattern[
        SelectedPosition.value
      ].Pattern = number;
    }
  }
}
</script>

<template>
  <div class="container">
    <ol tabindex="1" @keydown.prevent="handleKeyboard" id="pattern-matrix">
      <li
        v-for="line in PatternMatrix"
        :key="line.Position"
        :id="'patternmatrix-line-' + line.Position"
      >
        <p
          class="line-number"
          :class="[line.Position == MatrixPosition ? 'active' : '']"
        >
          {{ getTrackNumber(line.Position) }}
        </p>

        <div class="lines">
          <p
            v-for="pattern in line.Pattern"
            :key="pattern.ID"
            class="editable-paragraph"
            :tabindex="line.Position"
            :class="[
              MatrixPosition == line.Position ? 'active' : '',
              pattern.ID == SelectedPosition ? 'selected' : '',
            ]"
          >
            {{ pattern.Pattern }}
          </p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.editable-paragraph {
  color: lightgray;
}

.editable-paragraph.active {
  color: rgb(230, 230, 240);
}

.editable-paragraph.active.selected {
  color: white;
  text-decoration: underline;
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
  overflow-y: hidden;
  width: 100%;
  height: 100%;
}

ol:focus {
  outline: 2px solid var(--active-element-outline);
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
  color: var(--line-number-color);
}

.line-number {
  color: var(--line-number-color);
}

.line-number.active {
  color: white;
}
</style>
