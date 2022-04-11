<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import {
  Channels,
  MatrixPosition,
  PatternMatrix,
  ChannelNeedlePosition,
  PatternLength,
Notes,
Editor_CurrentScale,
} from "../SongData";

const props = defineProps({ channelID: { required: true, type: Number } });
let selectedColumn = ref(0);
let hasFocus = ref(false);

const noteColumnWidth = 1;
const instrumentColumnWidth = 2;
const effectColumnWidth = 8;
const maxColumnWidth =
  noteColumnWidth + instrumentColumnWidth + effectColumnWidth;

// Get selected column
const selectedColumnIndex = computed(() => {
  if (selectedColumn.value < noteColumnWidth) {
    return 0;
  }
  if (selectedColumn.value <= instrumentColumnWidth) {
    return 1;
  } else {
    return 2;
  }
});

// Get selected character of current column
const selectedColumnChar = computed(() => {
  if (selectedColumnIndex.value == 0)
  {
    return 0;

  } if (selectedColumnIndex.value == 1)
  {
    return (selectedColumnIndex.value * selectedColumn.value) - 1;

  } if (selectedColumnIndex.value == 2)
  {
    return Math.abs(selectedColumnIndex.value - selectedColumn.value + 1);
  }

});

const currentPattern = computed(() => 
{
  return Channels.value[props.channelID].Patterns[
    PatternMatrix.value[MatrixPosition.value].Pattern[props.channelID].Pattern
  ]
})

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

  if (event.key == "ArrowRight") {
    selectedColumn.value++;

    if (selectedColumn.value > maxColumnWidth - 1) {
      selectedColumn.value = 0;
    }
  }

  if (event.key == "ArrowLeft") {
    selectedColumn.value--;

    if (selectedColumn.value < 0) {
      selectedColumn.value = maxColumnWidth - 1;
    }
  }

  if (selectedColumnIndex.value == 0)
  {
    let key = event.key;
    let note = Notes.C0;
    if (key.length > 1) { return; }

    if (key == 'z')
    {
      console.log(Notes);
    }
 
    currentPattern.value.Notes[ChannelNeedlePosition.value].pitch = note;
  }
}

function getNoteString(pitch: number): string
{
  return Notes[pitch].padEnd(3, '-');
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

    <ol
      tabindex="0"
      @keydown="handleKeyboard"
      @focusin="hasFocus = true"
      @focusout="hasFocus = false"
    >
      <li
        class="pattern-line"
        v-for="note in currentPattern.Notes"
        :key="note.UID"
        tabindex="0"
        :class="[
          ChannelNeedlePosition == note.index ? 'selected' : '',
          hasFocus ? 'focused' : 'unfocused',
        ]"
        :id="'viewnote-' + note.UID"
      >
        <p :class="selectedColumnIndex == 0 ? 'selected' : ''">{{note.pitch < 16 ? '---' : getNoteString(note.pitch)}}</p>
        
        <p class="multichar">
          <p v-for="(char, index) in note.instrument_number.toString().padStart(2, '0')" :key="index" :class="selectedColumnIndex == 1 && selectedColumnChar == index ? 'selected' : ''">
            {{char}}
          </p>
        </p>
 
        <p class="multichar">
          <p v-for="(char, index) in note.effect_string" :key="index" :class="selectedColumnIndex == 2 && selectedColumnChar == index ? 'selected' : ''">
            {{char}}
          </p>
        </p>
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
  justify-content: center;
  user-select: none;
  background: var(--background-secondary);
  color: var(--text-muted);
}

p.multichar
{
  display: flex;
}

.pattern-line:focus {
  outline: none;
}

.pattern-line.selected {
  background: var(--background-secondary-alt);
}

.pattern-line.selected.focused {
  background: var(--background-tertiary);
  color: var(--text-normal);
}

.pattern-line.focused.selected p.selected {
  color: var(--text-bright);
  text-decoration: underline;
}
</style>
