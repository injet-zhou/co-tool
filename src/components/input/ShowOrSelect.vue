<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Props {
  labelField: string
  valueField: string
  value: any
  onUpdateValue: Function
  placeholder?: string
  options: Array<any>
}
const props = withDefaults(defineProps<Props>(), {
  value: '',
  onUpdateValue: () => {
    return () => {}
  },
  placeholder: '请选择',
  options: () => {
    return []
  },
})
const isEdit = ref(false)

const selectRef = ref()

const inputValue = ref(props.value)

const handleOnClick = () => {
  isEdit.value = true
}

const transferVal = (val: any, dictVal: any) => {
  if (
    typeof val === 'number'
      && typeof dictVal === 'string'
      && !Number.isNaN(dictVal)
  )
    return `${val}`

  return val
}

const label = (value: any) => {
  if (props.valueField === props.labelField)
    return value

  if (!value)
    return '-'

  if (!props.options.length)
    return value

  const v = transferVal(value, props.options[0][props.valueField])
  const option = props.options.find(
    (item: any) => item[props.valueField] === v,
  )
  return option ? option[props.labelField] : '-'
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
    nextTick(() => {
      selectRef.value.focus()
    })
  }
}
</script>

<template>
  <div tabindex="0" @click="handleOnClick" @focus="tabFocus">
    <n-select
      v-if="isEdit"
      ref="selectRef"
      v-model:value="inputValue"
      :options="props.options"
      :label-field="props.labelField"
      :value-field="props.valueField"
      :placeholder="props.placeholder"
      size="small"
      :filterable="true"
      @update:value="onUpdateValue"
      @blur="handleChange"
    />
    <span v-else>{{
      props.value !== '' && props.value !== null ? label(props.value) : '-'
    }}</span>
  </div>
</template>
