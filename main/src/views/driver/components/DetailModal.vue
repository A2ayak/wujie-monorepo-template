<template>
  <a-modal
    :visible="visible"
    title="驱动详情"
    @ok="handleOk"
    @cancel="visible = false"
  >
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="驱动信息">
        <a-descriptions size="small" :column="1">
          <a-descriptions-item label="驱动名称">xxx驱动</a-descriptions-item>
          <a-descriptions-item label="关联设备">盒子1</a-descriptions-item>
          <a-descriptions-item label="主机">192.168.1.1</a-descriptions-item>
          <a-descriptions-item label="驱动服务">default</a-descriptions-item>
          <a-descriptions-item label="修改时间">
            2024-06-18 08:41:22
          </a-descriptions-item>
          <a-descriptions-item label="创建日期">
            2024-06-18 08:41:22
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
      <!-- <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
			<a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane> -->
    </a-tabs>
  </a-modal>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from "vue";

const props = withDefaults(defineProps<{}>(), {});

const visible = defineModel<boolean>("visible", {
  default: false,
});

const activeKey = ref("1");

// watch(props.visible, () => {})

const emit = defineEmits<{
  (e: "update:visible", visible: boolean): void;
}>();

function handleOk() {
  console.log(1);
}

onMounted(() => {});
</script>
<style scoped lang="less"></style>
