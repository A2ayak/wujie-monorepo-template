import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const homeRoute: RouteRecordRaw = {
  path: "/home",
  name: "home",
  component: Layout,
  redirect: "/home/index",
  meta: {
    hidden: false,
    title: "首页",
    icon: "vue",
    order: 1,
  },
  children: [
    {
      path: "/home/index",
      name: "homeIndex",
      component: () => import("@/views/home/index.vue"),
      meta: {
        hidden: false,
        title: "首页",
        icon: "vue",
      },
    },
  ],
};

export default homeRoute;
