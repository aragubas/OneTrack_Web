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
  --background-color: rgb(98, 145, 184);
  --controls-color: rgb(119, 170, 210);
  --panels-color: rgb(112, 152, 187);

  --foreground-normal: rgb(230, 230, 245);
  --foreground-active: white;
  --line-number-color: rgb(210, 210, 230);

  --control-border-normal: rgb(129, 168, 196);
  --control-border-active: rgb(98, 158, 194);

  --control-background-active: rgb(129, 168, 196);

  --scrollbar-background: rgb(98, 158, 194);
  --scrollbar-thumb: rgb(129, 168, 196);

  --track-line-background: rgb(98, 145, 184);

  --active-element-outline: rgb(129, 168, 196);
}

body {
  background: var(--background-color);
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
