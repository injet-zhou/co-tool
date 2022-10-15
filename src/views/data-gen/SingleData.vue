<script setup lang="ts">
import { ref } from 'vue'
import { faker } from '@faker-js/faker'
const locale = ref('zh_CN')
faker.setLocale(locale.value)
const word = ref('')
const onLocaleChange = (value: string) => {
  faker.setLocale(value)
}

const gen = () => {
  word.value = faker.word.adjective()
}
</script>

<template>
  <div class="single-data">
    <n-space>
      <n-card title="本地化设置" size="small">
        <n-radio-group v-model:value="locale" name="radiogroup" @update:value="onLocaleChange">
          <n-space>
            <n-radio value="zh_CN">
              中文
            </n-radio>
            <n-radio value="en">
              英文
            </n-radio>
          </n-space>
        </n-radio-group>
        <n-button @click="gen">
          生成
        </n-button>
      </n-card>
      <n-card title="中卡片" size="small">
        {{ word }}
      </n-card>
    </n-space>
  </div>
</template>
