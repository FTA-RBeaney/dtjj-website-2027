<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

useSeoMeta({
  title: "Signing in",
});

const user = useSupabaseUser();

watch(user, () => {
  if (user.value) {
    navigateTo("/");
  }
}, { immediate: true });
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-6 text-center">
    <UIcon
      name="i-lucide-loader-circle"
      class="size-8 animate-spin text-primary"
    />
    <p>Signing you in…</p>
  </div>
</template>
