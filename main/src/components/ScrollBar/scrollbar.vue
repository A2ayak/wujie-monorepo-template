<template>
  <div ref="scrollbarRef" class="el-scrollbar">
    <div ref="wrapRef" :class="wrapKls" :style="style" @scroll="handleScroll">
      <component
        :is="tag"
        ref="resizeRef"
        :class="resizeKls"
        :style="viewStyle"
      >
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <bar
        ref="barRef"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </template>
  </div>
</template>
<script lang="ts" setup name="ElScrollbar">
import {
  computed,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  watch,
} from "vue";
import { useEventListener, useResizeObserver } from "@vueuse/core";
import { addUnit, isNumber, isObject } from "@/utils/element-plus";
import { useNamespace } from "@/hooks/element-plus/use-namespace";
import { GAP } from "./util";
import Bar from "./bar.vue";
import { scrollbarContextKey } from "./constants";
import { scrollbarEmits, scrollbarProps } from "./scrollbar";
import type { BarInstance } from "./bar";
import type { CSSProperties, StyleValue } from "vue";

const COMPONENT_NAME = "ElScrollbar";

const props = defineProps(scrollbarProps);
const emit = defineEmits(scrollbarEmits);

const ns = useNamespace("scrollbar");

let stopResizeObserver: (() => void) | undefined = undefined;
let stopResizeListener: (() => void) | undefined = undefined;

const scrollbarRef = ref<HTMLDivElement>();
const wrapRef = ref<HTMLDivElement>();
const resizeRef = ref<HTMLElement>();

const sizeWidth = ref("0");
const sizeHeight = ref("0");
const barRef = ref<BarInstance>();
const ratioY = ref(1);
const ratioX = ref(1);

const style = computed<StyleValue>(() => {
  const style: CSSProperties = {};
  if (props.height) style.height = addUnit(props.height);
  if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight);
  return [props.wrapStyle, style];
});

const wrapKls = computed(() => {
  return [
    props.wrapClass,
    ns.e("wrap"),
    { [ns.em("wrap", "hidden-default")]: !props.native },
  ];
});

const resizeKls = computed(() => {
  return [ns.e("view"), props.viewClass];
});

const handleScroll = () => {
  if (wrapRef.value) {
    barRef.value?.handleScroll(wrapRef.value);

    emit("scroll", {
      scrollTop: wrapRef.value.scrollTop,
      scrollLeft: wrapRef.value.scrollLeft,
    });
  }
};

// TODO: refactor method overrides, due to script setup dts
// @ts-nocheck
function scrollTo(xCord: number, yCord?: number): void;
function scrollTo(options: ScrollToOptions): void;
function scrollTo(arg1: unknown, arg2?: number) {
  if (isObject(arg1)) {
    wrapRef.value!.scrollTo(arg1);
  } else if (isNumber(arg1) && isNumber(arg2)) {
    wrapRef.value!.scrollTo(arg1, arg2);
  }
}

const setScrollTop = (value: number) => {
  if (!isNumber(value)) {
    console.warn(COMPONENT_NAME, "value must be a number");
    return;
  }
  wrapRef.value!.scrollTop = value;
};

const setScrollLeft = (value: number) => {
  if (!isNumber(value)) {
    console.warn(COMPONENT_NAME, "value must be a number");
    return;
  }
  wrapRef.value!.scrollLeft = value;
};

const update = () => {
  if (!wrapRef.value) return;
  const offsetHeight = wrapRef.value.offsetHeight - GAP;
  const offsetWidth = wrapRef.value.offsetWidth - GAP;

  const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight;
  const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth;
  const height = Math.max(originalHeight, props.minSize);
  const width = Math.max(originalWidth, props.minSize);

  ratioY.value =
    originalHeight /
    (offsetHeight - originalHeight) /
    (height / (offsetHeight - height));
  ratioX.value =
    originalWidth /
    (offsetWidth - originalWidth) /
    (width / (offsetWidth - width));

  sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
  sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
};

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      stopResizeObserver?.();
      stopResizeListener?.();
    } else {
      ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update));
      stopResizeListener = useEventListener("resize", update);
    }
  },
  { immediate: true }
);

watch(
  () => [props.maxHeight, props.height],
  () => {
    if (!props.native)
      nextTick(() => {
        update();
        if (wrapRef.value) {
          barRef.value?.handleScroll(wrapRef.value);
        }
      });
  }
);

provide(
  scrollbarContextKey,
  reactive({
    scrollbarElement: scrollbarRef,
    wrapElement: wrapRef,
  })
);

onMounted(() => {
  if (!props.native)
    nextTick(() => {
      update();
    });
});
onUpdated(() => update());

defineExpose({
  /** @description scrollbar wrap ref */
  wrapRef,
  /** @description update scrollbar state manually */
  update,
  /** @description scrolls to a particular set of coordinates */
  scrollTo,
  /** @description set distance to scroll top */
  setScrollTop,
  /** @description set distance to scroll left */
  setScrollLeft,
  /** @description handle scroll event */
  handleScroll,
});
</script>

<style lang="less">
.el-scrollbar {
  overflow: hidden;
  position: relative;
  height: 100%;
  &__wrap {
    overflow: auto;
    height: 100%;
    &--hidden-default {
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  &__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: inherit;
    background-color: #909399;
    opacity: 0.3;
    transition: background-color 0.5s ease-out;
    &:hover {
      background-color: #909399;
      opacity: 0.5;
    }
  }

  &__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;

    &.is-vertical {
      width: 6px;
      top: 2px;
      > div {
        width: 100%;
      }
    }

    &.is-horizontal {
      height: 6px;
      left: 2px;
      > div {
        height: 100%;
      }
    }
  }

  // &:active > .el-scrollbar__bar,
  // &:focus > .el-scrollbar__bar,
  // &:hover > .el-scrollbar__bar {
  // 	opacity: 1;
  // 	transition: opacity 340ms ease-out;
  // }
}
</style>
