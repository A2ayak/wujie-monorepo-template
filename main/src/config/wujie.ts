import router from "@/router";
import WujieVue from "wujie-vue3";
const { setupApp } = WujieVue;
import Layout from "@/layout/index.vue";
import { RouteRecordRaw } from "vue-router";

export const subApps = [
  {
    name: "vue2",
    desc: "vue2",
    port: 8001,
  },
  {
    name: "vue3",
    desc: "vue3",
    port: 8002,
  },
];
export function getUrl(appName: string, microList = subApps) {
  const { name, port } = microList.find((item) => item.name === appName) || {};
  console.log(name, port);

  if (import.meta.env.MODE === "development") {
    // return `//localhost:${config?.port}/${config?.name}/`
    // return `//localhost:${config?.port}`
    return `//localhost:${port}`;
  }
  return `/${name}/`;
}

export const lifecycles = {
  beforeLoad(appWindow: any) {
    // 第一次子应用的时候执行
    // 打开加载动画
  },
  beforeMount() {
    // console.log('beforeMount()-----------------');
  },
  afterMount(appWindow: any) {
    // 自应用第一次挂载到页面上之后执行(后续会缓存,不会执行)
    // 关闭加载动画
  },
  beforeUnmount(appWindow: any) {
    // console.log('beforeUnmount()-----------------');
  },
  afterUnmount(appWindow: any) {
    // console.log('afterUnmount()-----------------');
  },
  activated(appWindow: any) {
    // console.log(appWindow)
  },
  deactivated(appWindow: any) {
    // console.log('deactivated()-------------------------');
  },
};

const routes = {
  path: "/sub",
  name: "SubApps",
  component: Layout,
  redirect: "/sub/index",
  meta: {
    hidden: false,
    title: "subApps",
    icon: "vue",
    order: 4,
  },
  children: [],
};

// 模拟接口查询，实现动态子应用加载与动态路由添加
export function setupSubApps(): Promise<RouteRecordRaw> {
  return new Promise((resolve) => {
    for (const { name } of subApps) {
      // @ts-ignore
      routes.children.push({
        path: `/${name}`,
        name: name,
        component: () => import(`@/views/subApp/index.vue`), // 子应用使用同一个wujie配置
        meta: {
          hidden: false,
          title: `${name}`,
          icon: "vue",
        },
      });

      setupApp({
        name: name,
        url: getUrl(name, subApps),
        exec: true,
        // sync: true,
        ...lifecycles,
      });
    }
    resolve(routes);
  });
}
