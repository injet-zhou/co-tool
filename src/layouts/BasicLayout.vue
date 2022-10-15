<script setup lang="ts">
import SideBar from './SideBar.vue'
</script>

<template>
  <n-layout style="position: relative">
    <n-layout-header style="height: 40px">
      <!--      <basic-header /> -->
    </n-layout-header>
    <n-layout has-sider style="height: calc(100% - 40px)">
      <SideBar />

      <n-layout-content content-style="padding: 10px;">
        <slot />
      </n-layout-content>
    </n-layout>
    <!--    <n-layout-footer -->
    <!--      style=" -->
    <!--        position: absolute; -->
    <!--        bottom: 0; -->
    <!--        right: 0; -->
    <!--        height: 50px; -->
    <!--        width: 100%; -->
    <!--        z-index: -1; -->
    <!--      " -->
    <!--    > -->
    <!--    </n-layout-footer> -->
  </n-layout>
</template>
