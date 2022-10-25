<template>
    <div @click="handleOnClick" tabindex="0" @focus="tabFocus">
      <n-input-number
        v-model:value="inputValue"
        @blur="handleChange"
        @update:value="onUpdateValue"
        ref="inputRef"
        v-if="isEdit"
        size="small"
        :max="props.max"
        :min="props.min"
        :placeholder="props.placeholder"
        :status="props.required ? 'warning' : undefined"
      ></n-input-number>
      <span v-else>{{ props.value ? props.value : '-' }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { nextTick, ref } from 'vue';
  
  interface Props {
    value: any;
    onUpdateValue: Function;
    min?: number;
    max?: number;
    placeholder?: string;
    required?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    value: '',
    onUpdateValue: () => {
      return () => {};
    },
    placeholder: '请输入',
    updatable: false,
    required: false,
    min: undefined,
    max: undefined,
  });
  
  const isEdit = ref(false);
  
  const inputRef = ref();
  
  const inputValue = ref(props.value);
  
  const handleOnClick = () => {
    isEdit.value = true;
    nextTick(() => {
      inputValue.value = props.value;
      inputRef.value.focus();
    });
  };
  
  const onUpdateValue = (v: any) => {
    inputValue.value = v;
  };
  
  const handleChange = () => {
    props.onUpdateValue(inputValue.value);
    isEdit.value = false;
  };
  
  const tabFocus = () => {
    if (!isEdit.value) {
      isEdit.value = true;
      nextTick(() => {
        inputValue.value = props.value;
        inputRef.value.focus();
      });
    }
  };
  </script>
  