<script setup lang="ts">
import type { Component } from 'vue'
import { h, ref } from 'vue'
import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { DataPie20Regular, DataUsageEdit20Regular, Database20Regular } from '@vicons/fluent'

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const activeKey = ref<string | null>('dashboard')

const routerMenuItem = (name: string, title: string, icon?: Component) => {
  return {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name,
          },
        },
        { default: () => title },
      ),
    key: name,
    icon: icon ? renderIcon(icon) : undefined,
  }
}

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'dashboard',
  },
  {
    label: '数据生成',
    key: 'data-generator',
    icon: renderIcon(DataPie20Regular),
    children: [
      routerMenuItem('DataGenSingle', '单个数据', DataUsageEdit20Regular),
      {
        label: '批量生成',
        key: 'batch-data',
      },
    ],
  },
  {
    label: '数据库',
    key: 'database',
    icon: renderIcon(Database20Regular),
    children: [
      routerMenuItem('TableBuild', '建表（旧）'),
    ],
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
  },
]

const collapsed = ref(false)
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    :inverted="true"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      v-model:value="activeKey"
      :collapsed="false"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :inverted="true"
    />
  </n-layout-sider>
</template>

<style scoped>

</style>
