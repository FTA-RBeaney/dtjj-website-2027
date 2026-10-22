<script setup lang="ts">
import "@videojs/html/video/player";
import "@videojs/html/video/skin";
import "@videojs/html/media/mux-video";
import "@videojs/html/extensions/mux-data";

defineProps<{
  poster: string;
}>();
</script>

<template>
  <video-player :poster="poster">
    <video-skin>
      <slot />
      <template #poster>
        <img alt="">
      </template>
    </video-skin>
  </video-player>
</template>

<style>
video-skin {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
}
video-skin > img[slot="poster"] {
  object-fit: cover;
}
</style>
