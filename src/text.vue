<template>
  <div class="container" ref="containerRef">
    <span class="operation">
      <slot name="operation">{{ operationText }}</slot>
    </span>
    <span class="text" ref="textRef">
      <slot>{{ content }}</slot>
    </span>
    <span class="staitc-operation-text">
      <slot name="staitc-operation-text">{{ operationText }}</slot>
    </span>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, onMounted, nextTick } from 'vue';

interface TextProps {
  content: string;
  lineNumber: number;
  operationText: string;
  lineHeight: string;
}

const {
  content = '',
  lineNumber = 1,
  operationText = '',
  lineHeight = '1.12em'
} = defineProps<Partial<TextProps>>();

const textRef = ref<HTMLElement>();
const containerRef = ref<HTMLElement>();
const overflow = ref(false);
const height = ref('');

function overflowCheck() {
  nextTick(() => {
    height.value = `calc(${getComputedStyle(containerRef.value!).lineHeight} * ${lineNumber - 1})`
    overflow.value = textRef.value!.getClientRects().length > 3;
  })
}

onMounted(overflowCheck);

watch(() => [content, lineNumber, operationText], overflowCheck);

defineExpose({
  reload: overflowCheck,
  isOverflow: overflow,
})
</script>

<style scoped lang='less'>
.container {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind(lineNumber);
  line-clamp: v-bind(lineNumber);
  overflow: hidden;
  line-height: v-bind(lineHeight);
}

.container::before {
  content: '';
  float: right;
  width: 0;
  height: v-bind(height);
}

.operation {
  clear: both;
  float: right;
  display: v-bind("overflow ? 'block' : 'none'");
}
</style>