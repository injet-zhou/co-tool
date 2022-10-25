<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Props {
  value: any
  onUpdateValue: Function
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  onUpdateValue: () => {
    return () => {}
  },
  placeholder: '请输入',
})

const isEdit = ref(false)
const inputRef = ref()
const inputValue = ref(props.value)

const handleOnClick = () => {
  isEdit.value = true
  inputValue.value = ''
  nextTick(() => {
    inputValue.value = props.value
    inputRef.value.focus()
  })
}

const onUpdateValue = (v: any) => {
  inputValue.value = v
}

const handleChange = () => {
  props.onUpdateValue(inputValue.value)
  isEdit.value = false
}

const tabFocus = () => {
  if (!isEdit.value) {
    isEdit.value = true
    inputValue.value = ''
    nextTick(() => {
      inputValue.value = props.value
      inputRef.value.focus()
    })
  }
}
</script>

<template>
  <div tabindex="0" @click="handleOnClick" @focus="tabFocus">
    <n-input
      v-if="isEdit"
      ref="inputRef"
      v-model:value="inputValue"
      :placeholder="props.placeholder"
      size="small"
      @change="handleChange"
      @blur="handleChange"
      @update:value="onUpdateValue"
      @keyup.enter="handleChange"
    />
    <span v-else>{{ props.value ? props.value : '-' }}</span>
  </div>
</template>
