<script setup lang="ts">
import { Channels } from "../SongData";
import ChannelView from "./ChannelView.vue";
</script>

<template>
  <main>
    <ol>
      <li v-for="channel in Channels" :key="channel.ID">
        <ChannelView :channelID="channel.ID"></ChannelView>
      </li>
    </ol>
  </main>
</template>

<style scoped>
main {
  background: var(--control-background-active);
}

ol {
  display: flex;
  padding: 0.5rem;
  gap: 0.2rem;
}
</style>
