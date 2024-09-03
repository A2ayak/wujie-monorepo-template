<template>
  <div class="gri-base">
    <div class="table-layout">
      <div class="table-layout__header">
        <div class="left-condition">
          <div class="item">
            <a-input-search
              v-model:value="conditions.search"
              style="width: 250px"
              enter-button
              @search="onSearch(true)"
            />
          </div>
          <div class="item">
            <div class="item-label">在线情况</div>
            <div class="item-value">
              <a-select
                v-model:value="conditions.online"
                style="width: 200px"
                :options="statusOptions"
              />
            </div>
          </div>
        </div>
        <div class="right-button">
          <a-button type="primary">新增</a-button>
        </div>
      </div>
      <div class="table-layout__body">
        <DriverItem
          :data="{
            name: 'xxx驱动',
            status: 1,
            host: '192.168.1.1',
            driver: 'ault/dc3-driver-mqtt',
            createTime: '2024-06-18 08:41:22',
            updateTime: '2024-06-18 08:41:22',
          }"
        />
      </div>
      <div class="table-layout__footer">
        <a-pagination
          v-model:current="page.cur"
          v-model:page-size="page.size"
          :total="page.total"
          :page-size-options="['20', '50', '100']"
          :show-total="showTotal"
          @change="onSearch(false)"
          @show-size-change="onSearch(true)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { statusOptions } from "./model";
import DriverItem from "./components/DriverItem.vue";

import { theme } from "ant-design-vue";
const { useToken } = theme;
const { token } = useToken();

const conditions = reactive({
  search: "",
  online: null,
});

const page = reactive({
  cur: 1,
  total: 100,
  size: 20,
});

function onSearch(resetPage = false) {
  console.log("search");
}

function showTotal(total: number) {
  return `共 ${total} 条`;
}

onMounted(() => {
  console.log(token.value);
});
</script>
<style scoped lang="less"></style>
