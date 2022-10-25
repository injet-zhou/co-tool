<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Props {
  value: boolean
  onUpdateValue: Function
}
const props = withDefaults(defineProps<Props>(), {
  value: false,
  onUpdateValue: () => {
    return () => {}
  },
})

const isEdit = ref(false)

const checkboxRef = ref()

const inputValue = ref(props.value)

const handleOnClick = () => {
  isEdit.value = true
  nextTick(() => {
    checkboxRef.value.focus()
  })
}

const showContent = (val: any): string => {
  if (val === true)
    return '是'

  if (val === false)
    return '否'

  return '-'
}

const onUpdateValue = (v: boolean) => {
  inputValue.value = v
}

const handleChange = () => {
  props.onUpdateValue(inputValue.value)
  isEdit.value = false
}

const tabFocus = () => {
  if (!isEdit.value) {
    isEdit.value = true
    nextTick(() => {
      checkboxRef.value.focus()
    })
  }
}
</script>

<template>
  <div tabindex="0" @click="handleOnClick" @focus="tabFocus">
    <n-checkbox
      v-if="isEdit"
      ref="checkboxRef"
      v-model:checked="inputValue"
      @blur="handleChange"
      @update:checked="onUpdateValue"
    />
    <span v-else>{{ showContent(props.value) }}</span>
  </div>
</template>
