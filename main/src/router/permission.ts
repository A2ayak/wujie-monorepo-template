import type { Router, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/module/user";
import { generatePermissionRoutes } from "./utils/generatePermissionRoutes";
import { localCache } from "@/utils/webStorage";
import { setupSubApps } from "@/config/wujie";

const WHITE_LIST = ["/login"];

export default function permissionGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const token = localCache.getCache("token") || "";
    // 白名单和已登录情况
    if (WHITE_LIST.includes(to.path)) {
      // if (token && to.path === '/login') {
      // 	return next(from.fullPath)
      // }
      return next();
    }

    // 未登录情况
    if (token) {
      const user = userStore.getUser;
      if (user) {
        next();
      } else {
        try {
          await userStore.getUserInfo();
          const permissionRoutes = await generatePermissionRoutes(
            userStore.routeNames
          );
          userStore.setRoutes(permissionRoutes);
          permissionRoutes.forEach((route) => {
            router.addRoute(route);
          });

          next({
            path: to.path,
            query: { ...to.query },
          });
          // next({ path: to.fullPath, replace: true })
        } catch (error) {
          console.warn(error);
          next({ path: "/login", replace: true });
        }
      }
    } else {
      next("/login");
    }
  });
  return;
}
