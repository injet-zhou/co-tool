<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import sql from 'highlight.js/lib/languages/sql';
hljs.registerLanguage('sql', sql);
</script>

<template>
  <n-config-provider :hljs="hljs">
    <router-view />
  </n-config-provider>
  
</template>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
