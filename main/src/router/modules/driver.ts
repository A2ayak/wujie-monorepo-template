import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";

const driverRoute: RouteRecordRaw = {
  path: "/driver",
  name: "driver",
  component: Layout,
  redirect: "/driver/index",
  meta: {
    hidden: false,
    title: "驱动",
    icon: "vue",
    order: 2,
  },
  children: [
    {
      path: "/driver/index",
      name: "driverIndex",
      component: () => import("@/views/driver/index.vue"),
      meta: {
        hidden: false,
        title: "驱动",
        icon: "vue",
      },
    },
  ],
};

export default driverRoute;
