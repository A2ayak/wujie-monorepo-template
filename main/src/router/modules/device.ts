import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const deviceRoute: RouteRecordRaw = {
  path: "/device",
  name: "device",
  component: Layout,
  redirect: "/device/index",
  meta: {
    hidden: false,
    title: "设备",
    icon: "vue",
    order: 3,
  },
  children: [
    {
      path: "/device/index",
      name: "deviceIndex",
      component: () => import("@/views/device/index.vue"),
      meta: {
        hidden: false,
        title: "设备",
        icon: "vue",
      },
    },
  ],
};

export default deviceRoute;
