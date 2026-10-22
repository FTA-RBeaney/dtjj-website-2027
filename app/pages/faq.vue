<script setup lang="ts">
import { faqs } from "~/data/faqs";
</script>

<template>
  <div>
    <WebsiteHeader title="FAQ" />
    <ul>
      <li v-for="item in faqs" :key="item.question">
        <FaqItem :item="item" />
      </li>
    </ul>
  </div>
</template>
