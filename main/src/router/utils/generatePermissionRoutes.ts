import type { RouteRecordRaw } from "vue-router";
import { setupSubApps } from "@/config/wujie";

export async function generatePermissionRoutes(
  permission: string[]
): RouteRecordRaw[] {
  const routeModules: Recordable = import.meta.glob("../modules/**/*.ts", {
    eager: true,
  });

  const allRoutes: RouteRecordRaw[] = [];
  for (const path in routeModules) {
    const module = routeModules[path].default ?? {};
    allRoutes.push(module);
  }
  console.log("加载wujie路由");
  const wujieRoutes: RouteRecordRaw = await setupSubApps();
  allRoutes.push(wujieRoutes);
  console.log("allRoutes", allRoutes);

  allRoutes.sort(
    (a, b) => (a.meta?.order as number) - (b.meta?.order as number)
  );
  // const routes = filterRoute(allRoutes, permission)
  // console.log('filterRoutes', routes)

  // return routes
  return allRoutes;
}

function filterRoute(
  routes: RouteRecordRaw[],
  permission: string[]
): RouteRecordRaw[] {
  if (!routes.length) return [];
  const res: RouteRecordRaw[] = [];
  for (let i = 0; i < routes.length; i++) {
    const r = routes[i];
    if (!permission.includes(r.name as string)) continue;
    r.children = filterRoute(r.children || [], permission);
    if (r.children.length) {
      r.redirect = { name: r.children[0].name };
    }
    res.push(r);
  }
  return res;
}
