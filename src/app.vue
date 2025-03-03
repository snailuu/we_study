<template>
  <Text class="text" operationText="更多" :lineNumber="2" :content="text"></Text>
  <button @click="addText">添加文本</button>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import Text from './text.vue';

const text = ref('dasdfamet consectetur adi');

function addText() {
  text.value += "dasdfasdfolor"
  // textRef.value.reload();
}
</script>

<style scoped>
.text {
  width: 300px;
  word-break: break-all;
}
</style>

<style>
body {
  margin: 0;
}
</style>