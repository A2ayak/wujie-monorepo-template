import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
function render() {
  app.use(router).mount("#app");
}

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void };
    $wujie: any;
  }
}
if (window.__POWERED_BY_WUJIE__) {
  // console.log(window.$wujie)
  window.__WUJIE_MOUNT = () => {
    render();
  };
  window.__WUJIE_UNMOUNT = () => {
    app.unmount();
  };
  window.__WUJIE.mount();
} else {
  render();
}
