<template>
  <a-config-provider
    :locale="zhCN"
    :theme="{
      token: {
        colorPrimary: '#C4111D',
        borderRadius: 6,
        sizeStep: 4,
        sizeUnit: 4,
        wireframe: false,
      },
    }"
  >
    <!-- 		:get-popup-container="getPopupContainer" -->
    <!-- 		algorithm: theme.darkAlgorithm, -->
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

function getPopupContainer(node: HTMLElement) {
  if (node) {
    return node.parentNode;
  }
  return document.body;
}
</script>
