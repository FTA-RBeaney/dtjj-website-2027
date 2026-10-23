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
      <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -- video-skin is a native custom element (isCustomElement), not a Vue component: this is the DOM "slot" attribute, not Vue 2 slot syntax -->
      <img slot="poster" alt="">
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
