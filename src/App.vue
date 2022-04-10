<script setup lang="ts">
import TopPanel from "./components/TopPanel.vue";
import PatternMatrix from "./components/PatternMatrix.vue";
import ChannelPlaylist from "./components/ChannelPlaylist.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <TopPanel></TopPanel>
  <ChannelPlaylist></ChannelPlaylist>
</template>

<style>
@font-face {
  font-family: "PressStart2P";
  src: url("PressStart2P.ttf");
}

:root {
  /* Backgrounds */
  --background-primary: rgb(40, 42, 54);
  --background-secondary: rgb(50, 52, 68);
  --background-secondary-alt: rgb(60, 62, 78);
  --background-tertiary: rgb(70, 72, 88);
  --background-floating: rgb(60, 62, 78);
  --background-modifier-selected: rgba(90, 92, 108, 0.35);
  --background-accent: rgb(70, 72, 88);

  /* Shadows */
  --boxShadow-elevation-high: 0px 0px 8px rgba(0, 2, 12, 0.5);

  /* Scrollbars */
  --scrollbar-auto-thumb: rgb(60, 62, 78);
  --scrollbar-auto-track: rgb(50, 52, 68);

  /* Text Colors */
  --text-muted: rgb(110, 112, 128);
  --text-normal: rgb(220, 222, 232);
  --text-bright: rgb(242, 242, 255);
}

body {
  background: var(--background-primary);
  font-family: "PressStart2P";
  font-size: 8px;
  color: white;
  margin: 0;
  line-height: 2;
}

#app {
  display: flex;
  flex-flow: column;
}

h1,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style-type: none;
}

*::-webkit-scrollbar {
  background: var(--scrollbar-background);
  width: 0.3rem;
  height: 0.3rem;
}

*::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border: 1px solid transparent;
  background-clip: content-box;
}
</style>
