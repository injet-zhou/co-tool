<script setup lang="ts">
import BasicLayout from '../../layouts/BasicLayout.vue'
</script>

<template>
  <BasicLayout class="home-page">
    <router-view />
  </BasicLayout>
</template>

<style scoped>
.home-page {
  height: 100%;
}
</style>
