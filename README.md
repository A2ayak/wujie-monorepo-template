# 项目说明

### 目录结构说明（monorepo）

```
wujie-monorepo-template
├─common
|  ├─utils
|  ├─theme-chalk
├─main					// 主应用
|  ├─src
|  |  ├─api
|  |  ├─assets				// 资源文件（图片、SVG、字体等）
|  |  |  ├─svg
|  |  |  ├─images
|  |  |  ├─components			// 公共组件
|  |  |  |  ├─globalComp		// 全局组件（自动注册）
|  |  |  ├─hooks			// 自定义hooks
|  |  |  ├─layout			// 布局相关
|  |  |  ├─plugins			// 第三方插件包
|  |  |  ├─router			// 路由相关
|  |  |  ├─store			// pinia全局状态
|  |  |  ├─style			// 全局样式
|  |  |  |  ├─element-plus		// element-plus样式重写
|  |  |  ├─types			// 全局类型
|  |  |  |  ├─global.d.ts
|  |  |  ├─utils			// 全局工具函数
|  |  |  ├─views			// 业务页面
|  |  |  ├─App.vue
|  |  |  ├─main.ts			// 入口文件
├─sub					// 子应用
├─package.json
├─pnpm-workspace.yaml
├─README.md

```
