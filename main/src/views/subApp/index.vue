<template>
  <div class="sub-app">
    <WujieVue width="100%" height="100%" :name="name" :url="url" />
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getUrl } from "@/config/wujie";

// const router: any = useRouter()
const route = useRoute();
// console.log(router)
console.log("route", route);
// const url = ref('')

// watch(
// 	() => route.name,
// 	(newRouteName) => {
// 		// console.log('newVal', newVal)
// 		url.value = getUrl(newRouteName as string)
// 		console.log(url.value)
// 	},
// 	{
// 		immediate: true,
// 	}
// )

const url = computed(() => {
  console.log(route.name, "change");

  return getUrl(route.name as string);
});
const name = computed(() => route.name as string);
</script>
<style scoped lang="less">
.sub-app {
  height: 100%;
  width: 100%;
  .wujie_iframe {
    height: 100%;
  }
}
</style>
