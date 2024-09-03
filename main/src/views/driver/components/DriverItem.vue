<template>
  <div
    class="driver-item w-[350px] h-[300px] border border-solid"
    :style="{ borderColor: token.colorBorder }"
  >
    <div class="header w-full h-[66px] flex items-center justify-between px-4">
      <div class="left-title flex items-center">
        <svg-icon icon="vue" :size="24" />
        <span class="mx-2 w-max-[100px] truncate" :title="data.name">
          {{ data.name }}
        </span>
        <a-tag :color="getTagStatus(data.status)">
          {{ statusMap.get(data.status) }}
        </a-tag>
      </div>
      <div class="right-button">
        <a-button type="primary" @click="modalV = true">查看详情</a-button>
      </div>
    </div>
    <div class="divide-line w-full">
      <div
        class="h-[1px] mx-4"
        :style="{ backgroundColor: token.colorBorderSecondary }"
      ></div>
    </div>

    <div class="content w-full p-4 h-[calc(100%-66px-1px)]">
      <div class="content-item">
        <svg-icon icon="vue" />
        <span class="label">主机:</span>
        <span>{{ data.host }}</span>
      </div>
      <div class="content-item">
        <svg-icon icon="vue" />
        <span class="label">驱动:</span>
        <span>{{ data.driver }}</span>
      </div>
      <div class="content-item">
        <svg-icon icon="vue" />
        <span class="label">修改日期:</span>
        <span>{{ data.updateTime }}</span>
      </div>
      <div class="content-item">
        <svg-icon icon="vue" />
        <span class="label">创建日期:</span>
        <span>{{ data.createTime }}</span>
      </div>
    </div>
    <DetailModal v-model:visible="modalV" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();
import { statusMap, IDriverItem } from "../model";
import { getTagStatus } from "@/utils/business";
import DetailModal from "./DetailModal.vue";

const props = withDefaults(
  defineProps<{
    data: IDriverItem;
  }>(),
  {}
);

const modalV = ref(false);

onMounted(() => {});
</script>
<style scoped lang="less">
.driver-item {
  .content {
    .content-item {
      @apply flex items-center mb-4;
      .label {
        @apply ~"w-[80px] ml-2 mr-1 truncate";
      }
    }
  }
}
</style>
