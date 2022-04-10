<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Channels,
  MatrixPosition,
  PatternMatrix,
  ChannelNeddlePosition,
  PatternLength,
} from "../SongData";

const props = defineProps({ channelID: { required: true, type: Number } });
let selectedColumn = ref(0);

let currentPattern = ref(
  Channels.value[props.channelID].Patterns[
    PatternMatrix.value[MatrixPosition.value].Pattern[props.channelID].Pattern
  ]
);

watch(ChannelNeddlePosition, () => {
  // Scroll element into view
  var el = document.getElementById(
    "viewnote-" +
      Channels.value[props.channelID].Patterns[
        PatternMatrix.value[MatrixPosition.value].Pattern[props.channelID]
          .Pattern
      ].Notes[ChannelNeddlePosition.value].UID
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
  if (event.key == "ArrowUp") {
    ChannelNeddlePosition.value--;

    if (ChannelNeddlePosition.value < 0) {
      ChannelNeddlePosition.value = PatternLength.value - 1;
    }
  }

  if (event.key == "ArrowDown") {
    ChannelNeddlePosition.value++;

    if (ChannelNeddlePosition.value > PatternLength.value - 1) {
      ChannelNeddlePosition.value = 0;
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="top-toolbar">
      <nav>
        <ul>
          <li>
            <p>Channel {{ props.channelID }}</p>
          </li>
        </ul>
      </nav>
    </div>

    <ol tabindex="1" @keydown="handleKeyboard">
      <li
        class="pattern-line"
        v-for="note in currentPattern.Notes"
        :key="note.UID"
        tabindex="0"
        :class="ChannelNeddlePosition == note.index ? 'selected' : ''"
        :id="'viewnote-' + note.UID"
      >
        <p>000</p>
        <p>{{ note.instrument_number.toString().padStart(2, "0") }}</p>
        <p>{{ note.effect_string }}</p>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-flow: column;
  width: 12rem;

  height: 100%;
  padding: 0.4rem;
}

li:focus {
  outline: 2px solid red;
}

.top-toolbar {
  display: flex;
}

.pattern-line {
  display: flex;
  gap: 0.5rem;
  user-select: none;
  background: var(--background-secondary);
  color: var(--text-muted);
}

.pattern-line:focus {
  outline: none;
}

.pattern-line.selected {
  background: var(--background-secondary-alt);
  color: var(--text-normal);
}
</style>
