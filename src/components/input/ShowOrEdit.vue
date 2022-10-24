<template>
  <div @click="handleOnClick" tabindex="0" @focus="tabFocus">
    <n-input
      @change="handleChange"
      v-model:value="inputValue"
      @blur="handleChange"
      @update:value="onUpdateValue"
      ref="inputRef"
      v-if="isEdit"
      :placeholder="props.placeholder"
      size="small"
      @keyup.enter="handleChange"
    ></n-input>
    <span v-else>{{ props.value ? props.value : '-' }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Props {
  value: any;
  onUpdateValue: Function;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  onUpdateValue: () => {
    return () => {};
  },
  placeholder: '请输入',
});

const isEdit = ref(false);
const inputRef = ref();
const inputValue = ref(props.value);

const handleOnClick = () => {
  isEdit.value = true;
  inputValue.value = '';
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
    inputValue.value = '';
    nextTick(() => {
      inputValue.value = props.value;
      inputRef.value.focus();
    });
  }
};
</script>
