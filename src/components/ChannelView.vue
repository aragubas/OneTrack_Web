<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import {
  Channels,
  MatrixPosition,
  PatternMatrix,
  ChannelNeedlePosition,
  PatternLength,
} from "../SongData";

const props = defineProps({ channelID: { required: true, type: Number } });
let selectedColumn = ref(0);

const noteColumnWidth = 1;
const instrumentColumnWidth = 2;
const effectColumnWidth = 8;

const selectedColumnIndex = computed(() => {
  return selectedColumn.value * noteColumnWidth;
});

var channelThis: HTMLElement | null = null;

onMounted(() => {
  channelThis = document.getElementById("pattern-matrix");
});

let currentPattern = ref(
  Channels.value[props.channelID].Patterns[
    PatternMatrix.value[MatrixPosition.value].Pattern[props.channelID].Pattern
  ]
);

// Change selected pattern when needle position changes
watch(ChannelNeedlePosition, () => {
  // Scroll element into view
  var el = document.getElementById(
    "viewnote-" +
      Channels.value[props.channelID].Patterns[
        PatternMatrix.value[MatrixPosition.value].Pattern[props.channelID]
          .Pattern
      ].Notes[ChannelNeedlePosition.value].UID
  );

  if (el != null) {
    el.scrollIntoView({
      block: "center",
    });
  }
});

function handleKeyboard(event: KeyboardEvent) {
  if (event.key == "ArrowUp") {
    ChannelNeedlePosition.value--;

    if (ChannelNeedlePosition.value < 0) {
      ChannelNeedlePosition.value = PatternLength.value - 1;
    }
  }

  if (event.key == "ArrowDown") {
    ChannelNeedlePosition.value++;

    if (ChannelNeedlePosition.value > PatternLength.value - 1) {
      ChannelNeedlePosition.value = 0;
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

    <ol tabindex="0" @keydown="handleKeyboard">
      <li
        class="pattern-line"
        v-for="note in currentPattern.Notes"
        :key="note.UID"
        tabindex="0"
        :class="ChannelNeedlePosition == note.index ? 'selected' : ''"
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
  width: 8rem;
  height: calc(100vh - 5rem);
}

ol {
  overflow-y: hidden;
  outline: 2px solid var(--background-secondary);
}

ol:focus-within {
  outline: 2px solid var(--background-secondary-alt);
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
